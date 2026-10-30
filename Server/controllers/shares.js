import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'
import dotenv from 'dotenv'

dotenv.config()
const { JWT_SECRET } = process.env

const PRESENCE_TTL_MS = 30000
const sharePresence = new Map()

const cleanupExpiredPresence = () => {
  const now = Date.now()
  for (const [shareId, participants] of sharePresence) {
    for (const [sessionKey, participant] of participants) {
      if (now - participant.last_seen > PRESENCE_TTL_MS) {
        participants.delete(sessionKey)
      }
    }
    if (participants.size === 0) sharePresence.delete(shareId)
  }
}

const presenceCleanupTimer = setInterval(
  cleanupExpiredPresence,
  PRESENCE_TTL_MS
)
presenceCleanupTimer.unref()

const authenticate = (req, res, callback) => {
  const token = req.cookies?.access_token
  if (!token) {
    res.status(401).json('Not authenticated!')
    return
  }

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) {
      res.status(403).json('Token is not valid!')
      return
    }

    callback(userInfo)
  })
}

const withShareAccess = (shareId, userId, res, callback) => {
  const query = `SELECT s.share_id, u.username
    FROM shares s
    JOIN notes n ON n.note_id = s.note_id
    JOIN users u ON u.user_id = ?
    LEFT JOIN note_collaborators c
      ON c.share_id = s.share_id AND c.user_id = ?
    WHERE s.share_id = ? AND (n.user_id = ? OR c.user_id = ?)`

  db.query(query, [userId, userId, shareId, userId, userId], (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).json('Unable to check note sharing permissions.')
    }
    if (data.length === 0) {
      return res.status(404).json('Shared note not found.')
    }

    callback(data[0])
  })
}

export const updateSharePresence = (req, res) => {
  authenticate(req, res, (userInfo) => {
    const status = req.body?.status
    const sessionId = req.body?.session_id
    if (
      (status !== 'viewing' && status !== 'editing') ||
      typeof sessionId !== 'string' ||
      !/^[0-9a-f-]{36}$/i.test(sessionId)
    ) {
      return res.status(400).json('A valid session id and presence status are required.')
    }

    withShareAccess(req.params.id, userInfo.user_id, res, (share) => {
      cleanupExpiredPresence()
      const now = Date.now()
      const presence = sharePresence.get(share.share_id) || new Map()
      const sessionKey = `${userInfo.user_id}:${sessionId}`
      presence.set(sessionKey, {
        user_id: userInfo.user_id,
        session_id: sessionId,
        username: share.username,
        status,
        last_seen: now,
      })
      sharePresence.set(share.share_id, presence)
      return res.status(200).json('Presence updated.')
    })
  })
}

export const getSharePresence = (req, res) => {
  authenticate(req, res, (userInfo) => {
    withShareAccess(req.params.id, userInfo.user_id, res, (share) => {
      cleanupExpiredPresence()
      const presence = sharePresence.get(share.share_id)
      if (!presence) return res.status(200).json([])

      const otherParticipants = Array.from(presence.values()).filter(
        (participant) => participant.user_id !== userInfo.user_id
      )
      return res.status(200).json(otherParticipants)
    })
  })
}

export const deleteSharePresence = (req, res) => {
  authenticate(req, res, (userInfo) => {
    const presence = sharePresence.get(req.params.id)
    const sessionKey = `${userInfo.user_id}:${req.body?.session_id}`
    presence?.delete(sessionKey)
    if (presence?.size === 0) sharePresence.delete(req.params.id)
    return res.status(200).json('Presence removed.')
  })
}

const withOwnedShare = (shareId, userId, res, callback) => {
  const query =
    'SELECT s.share_id, s.note_id FROM shares s JOIN notes n ON n.note_id = s.note_id WHERE s.share_id = ? AND n.user_id = ?'

  db.query(query, [shareId, userId], (err, data) => {
    if (err) {
      res.status(500).json('Unable to check note sharing permissions.')
      return
    }
    if (data.length === 0) {
      res.status(404).json('Shared note not found.')
      return
    }

    callback(data[0])
  })
}

export const getShares = (req, res) => {
  authenticate(req, res, (userInfo) => {
    db.query(
      'SELECT * FROM shares WHERE user_id = ?',
      [userInfo.user_id],
      (err, data) => {
        if (err) return res.status(500).json('Unable to load shared notes.')
        return res.status(200).json(data)
      }
    )
  })
}

export const getSharedWithMe = (req, res) => {
  authenticate(req, res, (userInfo) => {
    const query = `SELECT
        s.share_id, n.note_id, n.name, n.content, n.version, n.folder_id,
        n.created_date, n.deleted, n.archive, n.favorite,
        n.user_id AS owner_id, owner.username AS owner_username,
        c.role AS permission
      FROM note_collaborators c
      JOIN shares s ON s.share_id = c.share_id
      JOIN notes n ON n.note_id = s.note_id
      JOIN users owner ON owner.user_id = n.user_id
      WHERE c.user_id = ? AND n.deleted = 0
      ORDER BY n.created_date DESC`

    db.query(query, [userInfo.user_id], (err, data) => {
      if (err) {
        console.error(err)
        return res.status(500).json('Unable to load notes shared with you.')
      }
      return res.status(200).json(data)
    })
  })
}

export const getShare = (req, res) => {
  authenticate(req, res, (userInfo) => {
    const query = `SELECT
        s.share_id, n.note_id, n.name, n.content, n.version, n.folder_id,
        n.created_date, n.deleted, n.user_id,
        CASE WHEN n.user_id = ? THEN 'owner' ELSE c.role END AS permission
      FROM shares s
      JOIN notes n ON n.note_id = s.note_id
      LEFT JOIN note_collaborators c
        ON c.share_id = s.share_id AND c.user_id = ?
      WHERE s.share_id = ?
        AND (n.user_id = ? OR c.user_id = ?)`

    db.query(
      query,
      [
        userInfo.user_id,
        userInfo.user_id,
        req.params.id,
        userInfo.user_id,
        userInfo.user_id,
      ],
      (err, data) => {
        if (err) return res.status(500).json('Unable to load shared note.')
        if (data.length === 0)
          return res.status(404).json('Shared note not found.')

        return res.status(200).json(data[0])
      }
    )
  })
}

export const addShare = (req, res) => {
  authenticate(req, res, (userInfo) => {
    const noteId = req.body?.note_id
    if (typeof noteId !== 'string' || !noteId.trim()) {
      return res.status(400).json('A note id is required.')
    }

    const findQuery = `SELECT s.share_id, s.user_id
      FROM shares s
      JOIN notes n ON n.note_id = s.note_id
      WHERE s.note_id = ? AND n.user_id = ?`
    db.query(findQuery, [noteId, userInfo.user_id], (findError, existing) => {
      if (findError)
        return res.status(500).json('Unable to check note sharing.')
      if (existing.length > 0) {
        const returnExistingShare = () =>
          res.status(200).json({
            msg: 'Note is already shared.',
            share_id: existing[0].share_id,
          })

        if (existing[0].user_id === userInfo.user_id)
          return returnExistingShare()

        return db.query(
          'UPDATE shares SET user_id = ? WHERE share_id = ?',
          [userInfo.user_id, existing[0].share_id],
          (repairError) => {
            if (repairError)
              return res.status(500).json('Unable to repair note sharing.')
            returnExistingShare()
          }
        )
      }

      const shareId = uuidv4()
      const insertQuery =
        'INSERT INTO shares (share_id, note_id, user_id) SELECT ?, note_id, user_id FROM notes WHERE note_id = ? AND user_id = ?'

      db.query(
        insertQuery,
        [shareId, noteId, userInfo.user_id],
        (insertError, result) => {
          if (insertError)
            return res.status(500).json('Unable to share this note.')
          if (result.affectedRows === 0)
            return res.status(404).json('Note not found.')

          return res.status(201).json({
            msg: 'Shared note has been created.',
            share_id: shareId,
          })
        }
      )
    })
  })
}

export const deleteShare = (req, res) => {
  authenticate(req, res, (userInfo) => {
    withOwnedShare(req.params.id, userInfo.user_id, res, (share) => {
      const query =
        'DELETE s FROM shares s JOIN notes n ON n.note_id = s.note_id WHERE s.share_id = ? AND n.user_id = ?'
      db.query(query, [share.share_id, userInfo.user_id], (err, result) => {
        if (err) return res.status(500).json('Unable to remove the share link.')
        if (result.affectedRows === 0)
          return res.status(404).json('Shared note not found.')

        return res.status(200).json('Note has been unshared.')
      })
    })
  })
}

export const getCollaborators = (req, res) => {
  authenticate(req, res, (userInfo) => {
    withOwnedShare(req.params.id, userInfo.user_id, res, (share) => {
      const query = `SELECT c.user_id, u.username, u.email, c.role, c.created_at
        FROM note_collaborators c
        JOIN users u ON u.user_id = c.user_id
        WHERE c.share_id = ?
        ORDER BY u.username`

      db.query(query, [share.share_id], (err, data) => {
        if (err)
          return res.status(500).json('Unable to load note collaborators.')
        return res.status(200).json(data)
      })
    })
  })
}

export const addCollaborator = (req, res) => {
  authenticate(req, res, (userInfo) => {
    const identifier =
      typeof req.body?.user === 'string' ? req.body.user.trim().toLowerCase() : ''
    const role = req.body?.role
    if (!identifier) return res.status(400).json('Enter a username or email.')
    if (!['viewer', 'editor'].includes(role))
      return res.status(400).json('Role must be viewer or editor.')

    withOwnedShare(req.params.id, userInfo.user_id, res, (share) => {
      db.query(
        'SELECT user_id FROM users WHERE username = ? OR email = ?',
        [identifier, identifier],
        (findError, users) => {
          if (findError)
            return res.status(500).json('Unable to find the invited user.')
          if (users.length === 0)
            return res.status(404).json('No registered user matches that value.')
          if (users[0].user_id === userInfo.user_id)
            return res.status(400).json('You already own this note.')

          const query = `INSERT INTO note_collaborators (share_id, user_id, role)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE role = VALUES(role)`

          db.query(
            query,
            [share.share_id, users[0].user_id, role],
            (saveError) => {
              if (saveError)
                return res.status(500).json('Unable to add this collaborator.')
              return res.status(201).json('Collaborator access saved.')
            }
          )
        }
      )
    })
  })
}

export const updateCollaborator = (req, res) => {
  authenticate(req, res, (userInfo) => {
    const role = req.body?.role
    if (!['viewer', 'editor'].includes(role))
      return res.status(400).json('Role must be viewer or editor.')

    withOwnedShare(req.params.id, userInfo.user_id, res, (share) => {
      const query =
        'UPDATE note_collaborators SET role = ? WHERE share_id = ? AND user_id = ?'

      db.query(
        query,
        [role, share.share_id, req.params.userId],
        (err, result) => {
          if (err)
            return res.status(500).json('Unable to update collaborator role.')
          if (result.affectedRows === 0)
            return res.status(404).json('Collaborator not found.')
          return res.status(200).json('Collaborator role updated.')
        }
      )
    })
  })
}

export const deleteCollaborator = (req, res) => {
  authenticate(req, res, (userInfo) => {
    withOwnedShare(req.params.id, userInfo.user_id, res, (share) => {
      db.query(
        'DELETE FROM note_collaborators WHERE share_id = ? AND user_id = ?',
        [share.share_id, req.params.userId],
        (err, result) => {
          if (err)
            return res.status(500).json('Unable to remove collaborator access.')
          if (result.affectedRows === 0)
            return res.status(404).json('Collaborator not found.')
          return res.status(200).json('Collaborator access removed.')
        }
      )
    })
  })
}

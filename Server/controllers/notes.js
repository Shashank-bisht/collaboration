import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'
import { checkAndDeleteImg } from './img.js'

import dotenv from 'dotenv'

dotenv.config()
const { JWT_SECRET } = process.env

// Get and Add notes
export const getNotes = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = `SELECT note_id, name, content, version, created_date, deleted, archive, favorite, folder_id FROM notes WHERE user_id = ? ORDER BY created_date DESC`

    db.query(q, [userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json('You can view only your notes!')

      return res.status(200).json(data)
    })
  })
}

export const getNote = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = `SELECT note_id, name, content, version, created_date, deleted, archive, favorite, folder_id FROM notes WHERE note_id = ? AND user_id = ?`

    db.query(q, [req.params.id, userInfo.user_id], (err, data) => {
      if (err || data.length === 0)
        return res.status(403).json('You can view only your notes!')

      return res.status(200).json(data[0])
    })
  })
}

export const addNote = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q =
      'INSERT INTO notes(`note_id`,`name`, `content`, `folder_id`, `user_id`) VALUES (?)' // `deleted`, `favorite`, `archive`,

    const values = [
      uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      req.body.name,
      `${req.body.content}`,
      req.body.folder_id,

      // req.body.deleted || false,
      // req.body.favorite || false,
      // req.body.archive || false,

      userInfo.user_id,
    ]

    if (req.body.name === '')
      return res.status(403).json('Name cannot be empty!')

    db.query(q, [values], (err, data) => {
      console.log(err)
      if (err) return res.status(500).json(err)

      return res.status(200).json('Note has been created.')
    })
  })
}

// delete note
export const deleteNote = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const noteId = req.params.id
    const q = 'DELETE FROM notes WHERE note_id = ? AND user_id = ?'

    // get note content
    const q2 = 'SELECT content FROM notes WHERE note_id = ? AND user_id = ?'
    let oldContent = ''

    db.query(q2, [noteId, userInfo.user_id], (_err, _data) => {
      if (_err) {
        console.log(_err)
        return res.status(500).json(_err)
      }

      oldContent = _data[0]?.content

      db.query(q, [noteId, userInfo.user_id], (err, data) => {
        if (err) return res.status(500).json(err)

        try {
          checkAndDeleteImg(oldContent ? oldContent : '', '')
        } catch (error) {
          console.log(error)
          return res.status(500).json(error)
        }

        return res.status(200).json('Note has been deleted.')
      })
    })
  })
}

// update note
export const updateNote = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const noteId = req.params.id
    const q2 = `SELECT n.content, n.user_id, c.role
      FROM notes n
      LEFT JOIN shares s ON s.note_id = n.note_id
      LEFT JOIN note_collaborators c
        ON c.share_id = s.share_id AND c.user_id = ?
      WHERE n.note_id = ?
        AND (n.user_id = ? OR c.user_id = ?)`

    db.query(
      q2,
      [userInfo.user_id, noteId, userInfo.user_id, userInfo.user_id],
      (permissionError, noteData) => {
        if (permissionError) {
          console.error(permissionError)
          return res
            .status(500)
            .json("Internal server error. Can't update note.")
        }
        if (noteData.length === 0) {
          return res.status(404).json('Note not found.')
        }

        const isOwner = noteData[0].user_id === userInfo.user_id
        if (!isOwner && noteData[0].role !== 'editor') {
          return res.status(403).json('You do not have edit access to this note.')
        }

        if (
          !isOwner &&
          Object.keys(req.body).some(
            (field) => !['name', 'content', 'version'].includes(field)
          )
        ) {
          return res
            .status(403)
            .json('Editors can update only the note title and content.')
        }

        if (
          req.body.name !== undefined &&
          (typeof req.body.name !== 'string' || req.body.name.trim() === '')
        ) {
          return res.status(400).json('Name cannot be empty.')
        }
        if (
          req.body.content !== undefined &&
          typeof req.body.content !== 'string'
        ) {
          return res.status(400).json('Note content must be text.')
        }

        const changesContent =
          req.body.name !== undefined || req.body.content !== undefined
        const expectedVersion = Number(req.body.version)
        if (
          changesContent &&
          (!Number.isSafeInteger(expectedVersion) || expectedVersion < 1)
        ) {
          return res
            .status(400)
            .json('A valid note version is required to save title or content.')
        }

        const assignments = []
        const values = []
        if (req.body.name !== undefined) {
          assignments.push('`name` = ?')
          values.push(req.body.name)
        }
        if (req.body.content !== undefined) {
          assignments.push('content = ?')
          values.push(req.body.content)
        }
        if (isOwner && req.body.folder_id !== undefined) {
          assignments.push('folder_id = ?')
          values.push(req.body.folder_id)
        }
        if (isOwner && req.body.archive !== undefined) {
          assignments.push('archive = ?')
          values.push(req.body.archive)
        }
        if (isOwner && req.body.favorite !== undefined) {
          assignments.push('favorite = ?')
          values.push(req.body.favorite)
        }
        if (isOwner && req.body.deleted !== undefined) {
          assignments.push('deleted = ?')
          values.push(req.body.deleted)
        }
        if (changesContent) assignments.push('version = version + 1')

        if (assignments.length === 0) {
          return res.status(400).json('No note changes were provided.')
        }

        const updateQuery = `UPDATE notes SET ${assignments.join(', ')}
          WHERE note_id = ?
            ${changesContent ? 'AND version = ?' : ''}
            AND (user_id = ? OR EXISTS (
              SELECT 1 FROM note_collaborators c
              WHERE c.share_id IN (
                SELECT s.share_id FROM shares s WHERE s.note_id = ?
              )
                AND c.user_id = ? AND c.role = 'editor'
            ))`

        db.query(
          updateQuery,
          [
            ...values,
            noteId,
            ...(changesContent ? [expectedVersion] : []),
            userInfo.user_id,
            noteId,
            userInfo.user_id,
          ],
          (updateError, result) => {
            if (updateError) {
              console.error(updateError)
              return res
                .status(500)
                .json("Internal server error. Can't update note.")
            }

            const finishUpdate = () => {
              if (
                req.body.content !== undefined &&
                noteData[0].content !== req.body.content
              ) {
                try {
                  checkAndDeleteImg(
                    noteData[0].content || '',
                    req.body.content
                  )
                } catch (imageError) {
                  console.error(imageError)
                  return res
                    .status(500)
                    .json("Internal server error. Can't update note images.")
                }
              }
              return res.status(200).json({
                message: 'Note has been updated.',
                ...(changesContent ? { version: expectedVersion + 1 } : {}),
              })
            }

            if (result.affectedRows > 0) return finishUpdate()

            const accessQuery = `SELECT n.user_id AS owner_id, n.name, n.content,
                n.version, n.created_date, n.deleted, n.archive, n.favorite,
                n.folder_id, s.share_id, owner.username AS owner_username,
                CASE WHEN n.user_id = ? THEN 'owner' ELSE c.role END AS permission
              FROM notes n
              LEFT JOIN shares s ON s.note_id = n.note_id
              LEFT JOIN users owner ON owner.user_id = n.user_id
              LEFT JOIN note_collaborators c
                ON c.share_id = s.share_id AND c.user_id = ?
              WHERE n.note_id = ?
                AND (n.user_id = ? OR c.role = 'editor')`
            db.query(
              accessQuery,
              [userInfo.user_id, userInfo.user_id, noteId, userInfo.user_id],
              (accessError, access) => {
                if (accessError) {
                  console.error(accessError)
                  return res
                    .status(500)
                    .json("Internal server error. Can't verify note access.")
                }
                if (access.length === 0) {
                  return res
                    .status(403)
                    .json('You no longer have edit access to this note.')
                }
                if (
                  changesContent &&
                  Number(access[0].version) !== expectedVersion
                ) {
                  return res.status(409).json({
                    message:
                      'This note was updated by someone else. Reload the latest version before saving your changes.',
                    currentNote: access[0],
                  })
                }
                return finishUpdate()
              }
            )
          }
        )
      }
    )
  })
}

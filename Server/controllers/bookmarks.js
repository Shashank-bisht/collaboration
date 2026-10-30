import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'

import dotenv from 'dotenv'

dotenv.config()
const { JWT_SECRET } = process.env

// note: share_id in bookmarks table can not be unique because one shared note can be bookmarked by multiple users
export const getBookmarks = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    // get all bookmarks and shared, notes except favorite, folder_name, archive details where shares share_id = bookmarks share_id and  shares note_id = notes note_id and shares user_id = user_id and notes deteled = 0

    // note: n.user_id and s.user_id will always same
    const q = `SELECT
                    b.bookmark_id,
                    s.share_id,
                    n.note_id,
                    n.name,
                    n.content,
                    n.version,
                    n.created_date,
                    n.deleted,
                    n.user_id
                FROM
                    bookmarks AS b
                JOIN
                    shares AS s
                ON
                    b.share_id = s.share_id
                JOIN
                    notes AS n
                ON
                    s.note_id = n.note_id
                WHERE
                    n.deleted = 0
                AND
                    b.user_id = ?
                AND
                    (n.user_id = ? OR EXISTS (
                      SELECT 1 FROM note_collaborators c
                      WHERE c.share_id = s.share_id AND c.user_id = ?
                    ))
                ORDER BY
                    n.created_date DESC
                    `
    db.query(q, [userInfo.user_id, userInfo.user_id, userInfo.user_id], (err, data) => {
      if (err) {
        console.error(err)
        return res.status(500).json('Unable to load bookmarks.')
      }

      return res.status(200).json(data)
    })
  })
}

// useless function for now but may be useful in future so keeping it here for now :)
export const getBookmark = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q =
      'SELECT b.bookmark_id, n.note_id, s.share_id, n.name, n.content, n.version, n.created_date, n.deleted, n.user_id FROM bookmarks b JOIN shares s ON b.share_id = s.share_id JOIN notes n ON s.note_id = n.note_id WHERE n.deleted = 0 AND b.bookmark_id = ? AND b.user_id = ? AND (n.user_id = ? OR EXISTS (SELECT 1 FROM note_collaborators c WHERE c.share_id = s.share_id AND c.user_id = ?))'

    db.query(
      q,
      [req.params.id, userInfo.user_id, userInfo.user_id, userInfo.user_id],
      (err, data) => {
      if (err) {
        console.error(err)
        return res.status(500).json('Unable to load bookmark.')
      }
      if (data.length === 0)
        return res.status(404).json('Bookmark not found.')

      return res.status(200).json(data[0])
      }
    )
  })
}

export const addBookmark = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const shareId = req.body?.share_id
    if (typeof shareId !== 'string' || !shareId.trim())
      return res.status(400).json('A share id is required.')

    const accessQuery = `SELECT s.share_id
      FROM shares s
      JOIN notes n ON n.note_id = s.note_id
      WHERE s.share_id = ?
        AND (n.user_id = ? OR EXISTS (
          SELECT 1 FROM note_collaborators c
          WHERE c.share_id = s.share_id AND c.user_id = ?
        ))`
    db.query(
      accessQuery,
      [shareId, userInfo.user_id, userInfo.user_id],
      (accessError, access) => {
        if (accessError)
          return res.status(500).json('Unable to verify share access.')
        if (access.length === 0)
          return res.status(403).json('You do not have access to this note.')

        const findQuery =
          'SELECT bookmark_id FROM bookmarks WHERE share_id = ? AND user_id = ?'
        db.query(
          findQuery,
          [shareId, userInfo.user_id],
          (findError, existing) => {
            if (findError)
              return res.status(500).json('Unable to check bookmark.')
            if (existing.length > 0) {
              return res.status(200).json({
                msg: 'Note is already bookmarked.',
                bookmark_id: existing[0].bookmark_id,
              })
            }

            const bookmarkId = uuidv4()
            db.query(
              'INSERT INTO bookmarks (bookmark_id, share_id, user_id) VALUES (?, ?, ?)',
              [bookmarkId, shareId, userInfo.user_id],
              (saveError) => {
                if (saveError)
                  return res.status(500).json('Unable to save bookmark.')
                return res.status(201).json({
                  msg: 'Bookmark has been created.',
                  bookmark_id: bookmarkId,
                })
              }
            )
          }
        )
      }
    )
  })
}

export const deleteBookmark = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const bookmark_id = req.params.id
    const q = 'DELETE FROM bookmarks WHERE `bookmark_id` = ? AND `user_id` = ?'

    db.query(q, [bookmark_id, userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json('You can delete only your bookmark!')

      return res.json('bookmark has been deleted!')
    })
  })
}

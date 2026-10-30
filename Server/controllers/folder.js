import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'
import { checkAndDeleteImg } from './img.js'
import dotenv from 'dotenv'

dotenv.config()
const { JWT_SECRET } = process.env

export const getFolders = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = 'SELECT folder_id, name FROM folders WHERE `user_id` = ?'

    db.query(q, [userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json('Something went wrong!')

      return res.status(200).json(data)
    })
  })
}

// usless function
export const getFolder = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')
    const q =
      'SELECT folder_id, name, created_date FROM folders WHERE `folder_id` = ? AND user_id = ?'

    db.query(q, [req.params.id, userInfo.user_id], (err, data) => {
      if (err || data.length === 0)
        return res.status(403).json('You can get only your folders!')

      return res.status(200).json(data[0])
    })
  })
}

export const addFolder = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = 'INSERT INTO folders(`folder_id`,`name`, `user_id`) VALUES (?)'
    const folderId = uuidv4() // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

    const values = [folderId, req.body.name, userInfo.user_id]

    if (req.body.name === '') return res.status(403).json('Name is required!')

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json('Internal server error')

      return res
        .status(200)
        .json({ msg: 'Succesfully created.', folder_id: folderId })
    })
  })
}

export const deleteFolder = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const folderId = req.params.id
    const q = 'DELETE FROM folders WHERE `folder_id` = ? AND `user_id` = ?'

    // get content from all notes from folder
    const qNotes = 'SELECT note_id, content FROM notes WHERE folder_id = ?'
    const oldcontent = []

    db.query(qNotes, [folderId], (_err, _data) => {
      if (_err) return res.status(500).json('Internal server error')

      _data.forEach((note) => {
        let cur = note.content
        oldcontent.push(cur ? cur : '')
      })

      // delete notes from folder
      db.query(q, [folderId, userInfo.user_id], (err, data) => {
        if (err)
          return res.status(403).json('Something went wrong! Try again later.')

        try {
          // delete images from folder
          oldcontent.forEach((content) => {
            checkAndDeleteImg(content, '')
          })
        } catch (err) {
          return res.status(500).json('Internal server error')
        }

        return res.status(200).json({ msg: 'Succesfully deleted.' })
      })
    })
  })
}

export const updateFolder = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const folderId = req.params.id
    const q =
      'UPDATE folders SET `name`=? WHERE `folder_id` = ? AND `user_id` = ?'

    db.query(q, [req.body.name, folderId, userInfo.user_id], (err, data) => {
      if (err) return res.status(500).json('Internal server error')

      return res.status(200).json({ msg: 'Succesfully updated.' })
    })
  })
}

import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '../db.js'

dotenv.config()
const { JWT_SECRET } = process.env

export const updateUser = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) {
      return res.status(403).json('Token is not valid!')
    }

    const q = 'SELECT * from users WHERE user_id = ?'

    db.query(q, [userInfo.user_id], (err, data) => {
      if (err || data.length === 0) {
        return res.status(403).json('User does not exist!')
      }

      const isPasswordCorrect = bcrypt.compareSync(
        req.body.currentPassword,
        data[0].password
      )

      if (!isPasswordCorrect) {
        return res
          .status(403)
          .json({ msg: 'Password is not correct!', status: 403 })
      }

      const q = 'UPDATE users SET `password` = ? WHERE `user_id` = ?'

      const salt = bcrypt.genSaltSync(10)
      const hash =
        req.body.password !== ''
          ? bcrypt.hashSync(req.body.password, salt)
          : data[0].password

      const values = [hash, userInfo.user_id]

      db.query(q, values, (err, newData) => {
        if (err) {
          return res.status(500).json(err)
        }

        return res
          .status(200)
          .json({ msg: 'Updated successfully!', status: 200 })
      })
    })
  })
}

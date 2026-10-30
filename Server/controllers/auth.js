import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'

dotenv.config()
const { NODE_ENV, SALT_KEY, JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_EXPIR_IN } =
  process.env

export const verify = (req, res) => {
  const token = req.cookies?.access_token

  if (!token) return res.json({ msg: 'Not authenticated', status: 401 })

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.json({ msg: 'Token is not valid!', status: 403 })

    return res.json({
      user_id: userInfo.user_id,
      msg: 'Succesfully authenticated!',
      status: 200,
    })
  })
}

export const register = (req, res) => {
  //CHECK EXISTING USER
  const q = 'SELECT * FROM users WHERE email = ? OR username = ?'

  req.body.email = req.body.email.toLowerCase()
  req.body.username = req.body.username.toLowerCase()

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json('Internal server error!')

    if (data.length) return res.status(409).json('User already exists!')

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(Number(SALT_KEY))
    const hash = bcrypt.hashSync(req.body.password, salt)

    const q =
      'INSERT INTO users(`user_id`,`username`,`email`,`password`) VALUES (?)'
    const values = [uuidv4(), req.body.username, req.body.email, hash]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json('Internal server error!')

      return res.status(200).json('Successfully registered!')
    })
  })
}

export const login = (req, res) => {
  //CHECK USER

  const q = 'SELECT * FROM users WHERE email = ? OR username = ?'

  req.body.user = req.body?.user?.toLowerCase()

  if (!req.body.user || !req.body.password)
    return res.status(400).json('Wrong username/email or password!')

  db.query(q, [req.body.user, req.body.user], (err, data) => {
    if (err) return res.status(500).json('Internal server error!')
    if (data.length === 0) return res.status(404).json('User not found!')

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    )

    if (!isPasswordCorrect)
      return res.status(400).json('Wrong username/email or password!')

    const token = jwt.sign({ user_id: data[0].user_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })
    const { password, ...other } = data[0]

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(
        new Date().setDate(new Date().getDate() + Number(JWT_COOKIE_EXPIR_IN))
      ),
    }
    // if (NODE_ENV === 'production') cookieOptions.secure = true

    res
      .cookie('access_token', token, cookieOptions)
      .status(200)
      .json({ ...other, msg: 'Succesfully logged in!' })
  })
}

export const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.')
}

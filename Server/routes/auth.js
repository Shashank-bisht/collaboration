import express from 'express'
import { verify, register, login, logout } from '../controllers/auth.js'

const router = express.Router()

router.post('/', verify)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

export default router

import express from 'express'
import { updateUser } from '../controllers/user.js'

const router = express.Router()

router.put('/', updateUser)

export default router

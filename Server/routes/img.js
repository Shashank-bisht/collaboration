import express from 'express'
import { saveFile, addImg, getImg } from '../controllers/img.js'

const router = express.Router()

router.get('/:filename', getImg)
router.post('/', saveFile, addImg)

export default router

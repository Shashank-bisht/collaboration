import express from 'express'
import {
  getFolders,
  getFolder,
  addFolder,
  deleteFolder,
  updateFolder,
} from '../controllers/folder.js'

const router = express.Router()

router.get('/', getFolders)
router.get('/:id', getFolder)
router.post('/', addFolder)
router.delete('/:id', deleteFolder)
router.put('/:id', updateFolder)

export default router

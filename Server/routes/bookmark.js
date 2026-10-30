import express from 'express'
import {
  getBookmarks,
  getBookmark,
  addBookmark,
  deleteBookmark,
} from '../controllers/bookmarks.js'

const router = express.Router()

router.get('/', getBookmarks)
router.get('/:id', getBookmark)
router.post('/', addBookmark)
router.delete('/:id', deleteBookmark)

export default router

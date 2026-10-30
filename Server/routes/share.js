import express from 'express'
import {
  getShares,
  getSharedWithMe,
  getSharePresence,
  updateSharePresence,
  deleteSharePresence,
  getShare,
  addShare,
  deleteShare,
  getCollaborators,
  addCollaborator,
  updateCollaborator,
  deleteCollaborator,
} from '../controllers/shares.js'

const router = express.Router()

router.get('/', getShares)
router.get('/with-me', getSharedWithMe)
router.get('/:id/presence', getSharePresence)
router.put('/:id/presence', updateSharePresence)
router.delete('/:id/presence', deleteSharePresence)
router.get('/:id', getShare)
router.post('/', addShare)
router.delete('/:id', deleteShare)
router.get('/:id/collaborators', getCollaborators)
router.post('/:id/collaborators', addCollaborator)
router.put('/:id/collaborators/:userId', updateCollaborator)
router.delete('/:id/collaborators/:userId', deleteCollaborator)

export default router

import Dvider from '../../../ui/dvider'
import { Button } from '../../../ui/button'
import { DialogFooter } from '../../../ui/dialog'
import { Input } from '../../../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select'
import { useToast } from '../../../ui/use-toast'
import React, { useEffect, useState, useContext } from 'react'
import { createPortal } from 'react-dom'

import { useGlobalContext } from '../../../../api/useGlobalContext'
import {
  xAddCollaborator,
  xAddShare,
  xDeleteCollaborator,
  xDeleteShare,
  xGetCollaborators,
  xUpdateCollaborator,
} from '../../../../api/fetch'

function ShareLink({ open, setOpen, data, share }) {
  const { getShares, activeBlock, setIsActiveNote, setNote } =
    useContext(useGlobalContext)

  const [activeShare, setActiveShare] = useState(share)
  const [collaborators, setCollaborators] = useState([])
  const [inviteUser, setInviteUser] = useState('')
  const [inviteRole, setInviteRole] = useState('viewer')
  const [confirmRemove, setConfirmRemove] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const shareId =
    activeShare?.note_id === data?.note_id ? activeShare.share_id : null

  useEffect(() => {
    setActiveShare(share)
  }, [share])

  useEffect(() => {
    if (!open || !shareId) {
      setCollaborators([])
      return
    }

    xGetCollaborators(shareId)
      .then(setCollaborators)
      .catch((error) => {
        toast({
          title: 'Could not load collaborators',
          description: error.response?.data || 'Please try again.',
          variant: 'danger',
        })
      })
  }, [open, shareId, toast])

  const handleShareLink = async () => {
    setLoading(true)
    try {
      if (shareId) {
        await xDeleteShare(shareId)
        setActiveShare(null)
        setCollaborators([])
        toast({
          title: 'Sharing link removed',
          description: 'All collaborator access to this note was revoked.',
          variant: 'success',
        })
        if (activeBlock === 'shared') {
          setIsActiveNote(false)
          setNote({})
        }
      } else {
        const result = await xAddShare({ note_id: data?.note_id })
        setActiveShare({ note_id: data.note_id, share_id: result.share_id })
        toast({
          title: 'Invitation link created',
          description: 'Only invited accounts can open this link.',
          variant: 'success',
        })
      }
      await getShares()
    } catch (error) {
      toast({
        title: 'Could not update sharing',
        description: error.response?.data || 'Please try again.',
        variant: 'danger',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInvite = async (event) => {
    event.preventDefault()
    if (!inviteUser.trim() || !shareId) return

    setLoading(true)
    try {
      await xAddCollaborator(shareId, inviteUser, inviteRole)
      setInviteUser('')
      setCollaborators(await xGetCollaborators(shareId))
      toast({
        title: 'Collaborator access saved',
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: 'Could not add collaborator',
        description: error.response?.data || 'Please try again.',
        variant: 'danger',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId, role) => {
    try {
      await xUpdateCollaborator(shareId, userId, role)
      setCollaborators((current) =>
        current.map((item) =>
          item.user_id === userId ? { ...item, role } : item
        )
      )
      toast({ title: 'Collaborator role updated', variant: 'success' })
    } catch (error) {
      toast({
        title: 'Could not update role',
        description: error.response?.data || 'Please try again.',
        variant: 'danger',
      })
    }
  }

  const handleRemoveCollaborator = async (userId) => {
    try {
      await xDeleteCollaborator(shareId, userId)
      setCollaborators((current) =>
        current.filter((item) => item.user_id !== userId)
      )
      toast({ title: 'Collaborator access removed', variant: 'success' })
    } catch (error) {
      toast({
        title: 'Could not remove collaborator',
        description: error.response?.data || 'Please try again.',
        variant: 'danger',
      })
    }
  }

  if (!open) return null

  return (
    createPortal(
      <div
        className='fixed inset-0 flex items-center justify-center p-4'
        style={{
          zIndex: 999999,
          backgroundColor: 'rgba(0, 0, 0, 0.72)',
        }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            setOpen(false)
            setConfirmRemove(false)
          }
        }}
      >
        <section
          role='dialog'
          aria-modal='true'
          aria-labelledby='share-access-title'
          className='relative grid w-full max-w-lg gap-4 overflow-y-auto rounded-lg border border-white/[10%] bg-background p-6 text-white shadow-lg'
          style={{ maxHeight: '85vh' }}
        >
          <button
            type='button'
            aria-label='Close sharing dialog'
            className='absolute right-4 top-3 rounded px-2 py-1 text-xl text-white/[70%] hover:bg-white/[10%]'
            onClick={() => {
              setOpen(false)
              setConfirmRemove(false)
            }}
          >
            ×
          </button>
        {confirmRemove ? (
          <>
            <h2 id='share-access-title' className='pr-8 text-xl'>
              Remove invitation link?
            </h2>
            <Dvider />
            <p>
              This will revoke access for every invited collaborator. You will
              need to invite them again if you create a new link later.
            </p>
            <DialogFooter>
              <Button
                type='button'
                size='sm'
                variant='secondary'
                onClick={() => setConfirmRemove(false)}
              >
                Keep sharing
              </Button>
              <Button
                type='button'
                size='sm'
                variant='destructive'
                onClick={handleShareLink}
                isLoading={loading}
              >
                Remove link and access
              </Button>
            </DialogFooter>
          </>
        ) : shareId ? (
          <>
            <h2 id='share-access-title' className='pr-8 text-xl'>
              Manage note access
            </h2>
            <Dvider />
            <p>
              Only the owner and invited accounts can open this link. Editors
              can change the title and content; viewers can only read the note.
            </p>

            <form onSubmit={handleInvite} className='flex flex-col gap-3'>
              <label htmlFor='collaborator-account'>
                Invite by registered username or email
              </label>
              <Input
                id='collaborator-account'
                value={inviteUser}
                onChange={(event) => setInviteUser(event.target.value)}
                placeholder='username or email@example.com'
                autoComplete='off'
              />
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger>
                  <SelectValue placeholder='Choose access' />
                </SelectTrigger>
                <SelectContent
                  className='bg-background'
                  style={{ zIndex: 1000001 }}
                >
                  <SelectItem value='viewer'>Viewer</SelectItem>
                  <SelectItem value='editor'>Editor</SelectItem>
                </SelectContent>
              </Select>
              <Button type='submit' size='sm' isLoading={loading}>
                Invite account
              </Button>
            </form>

            <Dvider />
            <h3 className='font-semibold'>People with access</h3>
            {collaborators.length ? (
              <div className='flex flex-col gap-3'>
                {collaborators.map((collaborator) => (
                  <div
                    key={collaborator.user_id}
                    className='flex flex-wrap items-center justify-between gap-2'
                  >
                    <div className='min-w-0'>
                      <p className='truncate'>{collaborator.username}</p>
                      <p className='truncate text-sm text-white/[60%]'>
                        {collaborator.email}
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Select
                        value={collaborator.role}
                        onValueChange={(role) =>
                          handleRoleChange(collaborator.user_id, role)
                        }
                      >
                        <SelectTrigger className='w-[120px]'>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent
                          className='bg-background'
                          style={{ zIndex: 1000001 }}
                        >
                          <SelectItem value='viewer'>Viewer</SelectItem>
                          <SelectItem value='editor'>Editor</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        type='button'
                        size='sm'
                        variant='destructive'
                        onClick={() =>
                          handleRemoveCollaborator(collaborator.user_id)
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-sm text-white/[60%]'>
                No collaborators have been invited yet.
              </p>
            )}

            <Dvider />
            <Button
              type='button'
              size='sm'
              variant='destructive'
              onClick={() => setConfirmRemove(true)}
            >
              Remove link and revoke all access
            </Button>
          </>
        ) : (
          <>
            <h2 id='share-access-title' className='pr-8 text-xl'>
              Create an invitation link
            </h2>
            <Dvider />
            <p>
              You can then invite specific registered accounts as viewers or
              editors. Other users who get the link will not be able to open
              the note.
            </p>
            <DialogFooter>
              <Button
                type='button'
                className='m-1'
                size='sm'
                variant='secondary'
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type='button'
                className='m-1'
                size='sm'
                onClick={handleShareLink}
                isLoading={loading}
              >
                Create invitation link
              </Button>
            </DialogFooter>
          </>
        )}
        </section>
      </div>,
      document.body
    )
  )
}

export default ShareLink

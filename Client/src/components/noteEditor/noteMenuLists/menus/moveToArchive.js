import Dvider from '../../../ui/dvider'
import { Button } from '../../../ui/button'
import { Dialog, DialogContent, DialogFooter } from '../../../ui/dialog'
import { useToast } from '../../../ui/use-toast'
import React, { useState, useContext } from 'react'

import { useGlobalContext } from '../../../../api/useGlobalContext'
import { xUpdateNote } from '../../../../api/fetch'

function MoveToArchive({ open, setOpen }) {
  const { setIsActiveNote, note, setNote, getNotes } =
    useContext(useGlobalContext)

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleArchiveNote = async () => {
    setLoading(true)
    try {
      await xUpdateNote(note?.note_id, {
        archive: 1,
      })
      toast({
        title: 'Move to archive successfully',
        variant: 'success',
      })
      getNotes()
      setIsActiveNote(false)
      setNote({})
    } catch (err) {
      toast({
        title: 'Failed to move note to archive',
        // description: err.response.data,
        variant: 'danger',
      })
    }
    setLoading(false)
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <h2 className='text-xl'>Move to archive</h2>
        <Dvider />
        <p>Are you sure you want to move this note to archive ?</p>
        <DialogFooter>
          <Button
            className='m-1'
            size={'sm'}
            variant={'secondary'}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className='m-1'
            size={'sm'}
            variant={'destructive'}
            onClick={() => handleArchiveNote()}
            isLoading={loading}
          >
            Yes, move it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MoveToArchive

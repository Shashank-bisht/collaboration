import Dvider from '../../../ui/dvider'
import { Button } from '../../../ui/button'
import { Dialog, DialogContent, DialogFooter } from '../../../ui/dialog'
import { useToast } from '../../../ui/use-toast'
import React, { useState, useContext } from 'react'

import { useGlobalContext } from '../../../../api/useGlobalContext'
import { xUpdateNote } from '../../../../api/fetch'

function MoveToTrash({ open, setOpen }) {
  const { setIsActiveNote, note, setNote, getNotes } =
    useContext(useGlobalContext)

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleRemoveNote = async () => {
    setLoading(true)
    try {
      await xUpdateNote(note?.note_id, {
        deleted: 1,
      })
      toast({
        title: 'Move to trash successfully',
        variant: 'success',
      })
      getNotes()
      setIsActiveNote(false)
      setNote({})
    } catch (err) {
      toast({
        title: 'Failed to move note to trash',
        description: err.response.data,
        variant: 'danger',
      })
    }
    setLoading(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <h2 className='text-xl'>Move to trash</h2>
        <Dvider />
        <p>Are you sure you want to move this note to trash ?</p>
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
            onClick={() => handleRemoveNote()}
            isLoading={loading}
          >
            Yes, move it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MoveToTrash

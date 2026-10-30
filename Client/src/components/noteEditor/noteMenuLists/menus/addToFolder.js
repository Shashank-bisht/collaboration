import React, { useState, useContext } from 'react'
import { useMediaQuery } from 'react-responsive'
import Dvider from '../../../ui/dvider'
import { Button } from '../../../ui/button'
import { Dialog, DialogContent, DialogFooter } from '../../../ui/dialog'
import { useToast } from '../../../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select'

import { useGlobalContext } from '../../../../api/useGlobalContext'
import { xAddNote, xUpdateNote } from '../../../../api/fetch'

function AddToFolder({ open, setOpen, method }) {
  const { note, setIsActiveNote, folders, getNotes } =
    useContext(useGlobalContext)

  const [loading, setLoading] = useState(false)
  const [selectFolderId, setSelectFolderId] = useState('')
  const { toast } = useToast()
  const Navigate = useNavigate()

  const handleAddToFolder = async () => {
    setLoading(true)
    try {
      if (selectFolderId !== '') {
        // copy note to folder
        await xAddNote({
          name: note?.name,
          content: note?.content,
          folder_id: selectFolderId,
        })

        toast({
          title: 'Successfully added to folder',
          variant: 'success',
        })
        getNotes()
        Navigate(`/app/folders/${selectFolderId}`)
      } else {
        toast({
          title: 'Select folder to add note to it',
          variant: 'danger',
        })
      }
    } catch (err) {
      toast({
        title: 'Something went wrong!',
        variant: 'danger',
      })
    }
    setLoading(false)
    setOpen(false)
  }

  const handleMoveToFolder = async () => {
    setLoading(true)
    try {
      if (selectFolderId !== '') {
        // move note to folder
        await xUpdateNote(note?.note_id, {
          folder_id: selectFolderId,
        })

        toast({
          title: `Successfully ${
            method === 'copy' ? 'added' : 'moved'
          }  to folder`,
          variant: 'success',
        })
        getNotes()
        setIsActiveNote(false)
        // Navigate(`/app/folders/${selectFolderId}`)
      } else {
        toast({
          title: `Select folder to ${
            method === 'copy' ? 'add' : 'move'
          } note to it`,
          variant: 'danger',
        })
      }
    } catch (err) {
      toast({
        title: 'Something went wrong!',
        variant: 'danger',
      })
    }
    setLoading(false)
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <h2 className='text-xl'>
          {method === 'copy' ? 'Add' : 'Move'} to folder
        </h2>
        <Dvider />
        <p>
          Select folder to {method === 'copy' ? 'add' : 'move'} this note to it
          <br />
          {!useMediaQuery({ minWidth: 1024 }) ? (
            <em className='text-sm text-gray-500'>
              Note: press and hold to select folder.
            </em>
          ) : null}
          <Select
            id='folder'
            onValueChange={(value) => setSelectFolderId(value)}
          >
            <SelectTrigger className='w-[130px] focus:outline-none focus:ring-0 focus:ring-offset-0 pr-0 border border-gray-400 rounded-md my-2'>
              <SelectValue placeholder='Select Folder' />
            </SelectTrigger>
            <SelectContent className='bg-background border-none'>
              {folders.map((item, i) => (
                <SelectItem
                  value={`${item.folder_id}`}
                  className='capitalize focus:bg-white/[5%] focus:text-white text-white/[60%]'
                  key={i}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </p>

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
            onClick={() =>
              method === 'copy' ? handleAddToFolder() : handleMoveToFolder()
            }
            isLoading={loading}
          >
            {method === 'copy' ? 'Yes, add it' : 'Yes, move it'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddToFolder

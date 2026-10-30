import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { useGlobalContext } from '../../api/useGlobalContext'
import { xAddNote } from '../../api/fetch'

function CreateNote() {
  const params = useParams()
  const { folderId } = params

  const [isLoading, setLoading] = useState(false)
  const { toast } = useToast()
  const { setIsSidebarOpen, getNotes } = useContext(useGlobalContext)

  const handleCreateNote = async () => {
    setLoading(true)

    try {
      await xAddNote({
        folder_id: folderId,
        name: 'Untitled',
        content: '',
        favorite: 0,
        deleted: 0,
      })
      getNotes()

      toast({
        title: 'Note succesfully created',
        variant: 'success',
      })
    } catch (err) {
      toast({
        title: 'Note succesfully created',
        variant: 'danger',
      })
    }

    setLoading(false)
    setIsSidebarOpen(false)
  }

  return (
    <div className='px-[20px]'>
      <Button
        className='w-full text-[16px] font-semibold'
        size={'lg'}
        isLoading={isLoading}
        disabled={params.folderId ? false : true}
        variant={'secondary'}
        onClick={() => handleCreateNote()}
      >
        {isLoading ? null : <FiPlus className='text-[20px] mr-2' />}
        <span>New Note</span>
      </Button>
    </div>
  )
}

export default CreateNote

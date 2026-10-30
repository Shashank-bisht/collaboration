import React, { useState, useContext } from 'react'
import { Loader2 } from 'lucide-react'
import { FiFolderPlus, FiSave, FiX } from 'react-icons/fi'
import { Button } from '../../ui/button'
import { useToast } from '../../ui/use-toast'
import { isExistArray } from '../../../lib/utils'

import { xAddFolder, xUpdateFolder } from '../../../api/fetch'
import { useGlobalContext } from '../../../api/useGlobalContext'
import { xAddNote } from '../../../api/fetch'
import { useFolderState } from './store'
import { CONTENT } from '../../../lib/note/CONST'

function SaveFolder() {
  const { folders, getFolders, refreshChanger } = useContext(useGlobalContext)
  const {
    name,
    setName,

    updateData,
    setUpdateData,

    isCreateFolder,
    setIsCreate,

    isEditFolder,
    setIsEdit,
  } = useFolderState()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAddFolder = () => {
    setIsLoading(true)

    if (name === '') {
      toast({
        title: 'Folder name cannot be empty',
        variant: 'danger',
      })
      setIsLoading(false)
      return
    }

    if (isExistArray(folders, 'name', name)) {
      toast({
        title: 'Folder name already exist',
        variant: 'danger',
      })
      setIsLoading(false)
      return
    }

    setTimeout(async () => {
      try {
        const _ = await xAddFolder(name)
        await xAddNote({
          folder_id: _?.folder_id,
          name: 'Reflection on the Month of June',
          content: `${CONTENT}`,
        })

        refreshChanger()

        toast({
          title: _?.msg,
          variant: 'success',
        })
        setIsLoading(false)
        setIsCreate(false)
        setName('New Folder')
      } catch (err) {
        toast({
          title: 'Failed to create',
          description: err.response.data,
          variant: 'danger',
        })
        setIsLoading(false)
      }
    }, 500)
  }

  const handleUpdateFolder = () => {
    const { folder_id, name } = updateData
    setIsLoading(true)

    if (name === '') {
      toast({
        title: 'Folder name cannot be empty',
        variant: 'danger',
      })
      setIsLoading(false)
      return
    }

    if (isExistArray(folders, 'name', name)) {
      toast({
        title: 'Folder name already exist',
        variant: 'danger',
      })
      setIsLoading(false)
      return
    }

    setTimeout(async () => {
      try {
        const _ = await xUpdateFolder(folder_id, name)
        getFolders()

        toast({
          title: _?.msg,
          variant: 'success',
        })
        setIsLoading(false)
        setIsEdit(false)
        setUpdateData({
          folder_id: '',
          name: '',
        })
      } catch (err) {
        toast({
          title: 'Failed to update',
          description: err.response.data,
          variant: 'danger',
        })
        setIsLoading(false)
      }
    }, 500)
  }

  return (
    <>
      {isCreateFolder || isEditFolder ? (
        <div className='flex'>
          <Button
            size={'sm'}
            variant={'ghost'}
            className='px-2 py-2'
            disabled={
              isLoading ||
              ((isCreateFolder ? name === '' : updateData.name === '') && true)
            }
            onClick={() => {
              if (isCreateFolder) {
                handleAddFolder()
                return
              }
              handleUpdateFolder()
            }}
          >
            {isLoading ? (
              <Loader2 className='h-[20px] w-[20px] animate-spin' />
            ) : (
              <FiSave className='text-[20px]' />
            )}
          </Button>
          <Button
            size={'sm'}
            variant={'ghost'}
            className='px-2 py-2'
            disabled={isLoading}
            onClick={() => {
              setIsCreate(false)
              setIsEdit(false)
              setName('New Folder')
            }}
          >
            <FiX className='text-[20px]' />
          </Button>
        </div>
      ) : (
        <Button size={'sm'} variant={'ghost'} onClick={() => setIsCreate(true)}>
          <FiFolderPlus className='text-[20px]' />
        </Button>
      )}
    </>
  )
}

export default SaveFolder

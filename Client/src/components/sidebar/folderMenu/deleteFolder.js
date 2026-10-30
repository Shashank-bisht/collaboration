import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Dvider from '../../ui/dvider'
import { Button } from '../../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '../../ui/dialog'
import { useToast } from '../../ui/use-toast'

import { xDeleteFolder } from '../../../api/fetch'
import { useGlobalContext } from '../../../api/useGlobalContext'
import { useFolderState } from './store'

const DialogDelete = () => {
  const { toast } = useToast()
  const { refreshChanger, activeBlock, setActiveBlock } =
    useContext(useGlobalContext)
  const { isOpenDialogDelete, setDialogDelete, deleteData, setDeleteData } =
    useFolderState()

  const [isLoading, setIsLoading] = useState(false)
  const Navigate = useNavigate()

  const handleDeleteFolder = async () => {
    setIsLoading(true)
    try {
      const _ = await xDeleteFolder(deleteData?.folder_id)

      if (activeBlock === 'folder') {
        if (window.location.pathname.split('/')[3] === deleteData?.folder_id) {
          setActiveBlock(null)
          Navigate('/app')
        } else {
          setActiveBlock(activeBlock)
        }
      } else {
        setActiveBlock(activeBlock)
      }

      refreshChanger()
      setIsLoading(false)
      setDialogDelete(false)
      setDeleteData({
        folder_id: '',
        name: '',
      })
      toast({
        title: 'Success',
        description: _?.msg,
        variant: 'success',
      })
    } catch (err) {
      setIsLoading(false)
      toast({
        title: 'Error',
        description: err.response.data,
        variant: 'danger',
      })
    }
  }

  return (
    <Dialog open={isOpenDialogDelete}>
      <DialogContent>
        <DialogHeader>
          <h2 className='text-2xl font-semibold'>Delete Folder?</h2>
          <Dvider />
        </DialogHeader>
        <p>
          Are you sure you want to delete
          <span className='font-bold'> {deleteData?.name} </span> folder?. This
          will also delete all notes
        </p>
        <DialogFooter>
          <Button
            className='m-1'
            onClick={() => {
              setDialogDelete(false)
              setDeleteData(null)
            }}
            size={'sm'}
            variant={'secondary'}
          >
            Cancel
          </Button>
          <Button
            className='m-1'
            isLoading={isLoading}
            onClick={() => handleDeleteFolder()}
            size={'sm'}
            variant={'destructive'}
          >
            Yes, delete it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogDelete

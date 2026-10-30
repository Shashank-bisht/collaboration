import React, { useEffect, useContext } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Button } from '../ui/button'

import Dvider from '../ui/dvider'
import { Dialog, DialogContent, DialogFooter } from '../ui/dialog'

import { IoChevronBackOutline } from 'react-icons/io5'
import { useToast } from '../ui/use-toast'

import { useGlobalContext } from '../../api/useGlobalContext'
import { xUpdateNote, xDeleteNote } from '../../api/fetch'

function TrashMenu() {
  const isBigScreen = useMediaQuery({ minWidth: 1024 })

  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()
  const {
    note,
    setNote,
    getNotes,
    isActiveNote,
    setIsActiveNote,
    setActiveBlock,
  } = useContext(useGlobalContext)

  const [method, setMethod] = React.useState('restore')
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setActiveBlock('trash')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleNote() {
    setLoading(true)
    try {
      if (method === 'restore') {
        await xUpdateNote(note?.note_id, {
          deleted: 0,
        })
        toast({
          title: 'Note succesfully restored',
          variant: 'success',
        })
      }
      if (method === 'delete') {
        await xDeleteNote(note?.note_id)
        toast({
          title: 'Note succesfully deleted',
          variant: 'success',
        })
      }
      getNotes()
      setIsActiveNote(false)
      setNote({})
      // Navigate()
    } catch (err) {
      toast({
        title:
          method === 'restore'
            ? 'Failed to restore note'
            : 'Failed to delete note',
        description: 'Please try again later',
        variant: 'danger',
      })
    }
    setLoading(false)
    setMethod('restore')
    setOpen(false)
  }

  return (
    <>
      {isActiveNote && (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <h2 className='text-xl'>
                {method === 'restore' ? 'Restore' : 'Delete'} note !
              </h2>
              <Dvider />
              <p>
                Are you sure you want to{' '}
                <span className='font-semibold'>
                  {method === 'restore' ? 'restore' : 'delete'}
                </span>{' '}
                this note ?
              </p>
              <DialogFooter>
                <Button
                  className='m-1'
                  size={'sm'}
                  variant={'secondary'}
                  onClick={() => {
                    setMethod('restore')
                    setOpen(false)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className='m-1'
                  size={'sm'}
                  variant={method === 'restore' ? 'default' : 'destructive'}
                  onClick={() => handleNote()}
                  isLoading={loading}
                >
                  {method === 'restore' ? 'Yes, move it' : 'Yes, delete it'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className='px-2 flex flex-col gap-[10px] items-center justify-center h-[calc(100vh-60px)] w-auto lg:w-[calc(100vw-650px)] lg:h-screen'>
            <img
              alt='icon'
              priority
              src={'/history.svg'}
              height={80}
              width={80}
            />
            <h2 className='font-semibold text-[28px] text-center'>
              Restore "<span>{`${note.name}`}</span>"
            </h2>
            <p className='lg:w-[460px] text-center font-normal text-white/[60%]'>
              Don't want to lose this note? It's not too late! Just click the
              'Restore' button and it will be added back to your list. It's that
              simple.
            </p>
            <span className='mt-2'>
              <Button
                className='text-[16px] font-semibold'
                size={'lg'}
                onClick={() => {
                  setMethod('restore')
                  setOpen(true)
                }}
                isLoading={loading}
              >
                <span>Restore</span>
              </Button>
              <span className='m-2'></span>
              <Button
                className='text-[16px] font-semibold'
                size={'lg'}
                variant={'destructive'}
                onClick={() => {
                  setMethod('delete')
                  setOpen(true)
                }}
                isLoading={loading}
              >
                <span>Delete</span>
              </Button>
            </span>
          </div>
          {!isBigScreen ? (
            <div className='fixed bottom-0 left-0 translate-x-[10px] z-[10] -translate-y-[10px]'>
              <Button
                variant={'secondary'}
                onClick={() => {
                  setIsActiveNote(null)
                }}
                className='backdrop-blur-md'
              >
                <IoChevronBackOutline className='text-xl mr-2' />
                Go Back
              </Button>
            </div>
          ) : null}
        </>
      )}
    </>
  )
}

export default TrashMenu

import React, { useContext, useState } from 'react'
import { Button } from '../../../ui/button'
import { useToast } from '../../../ui/use-toast'
import { useGlobalContext } from '../../../../api/useGlobalContext'
import { xUpdateNote } from '../../../../api/fetch'

function LockMenus({ editor }) {
  const { toast } = useToast()
  const [conflict, setConflict] = useState(null)
  const {
    note,
    setNote,
    getNotes,
    getSharedWithMe,
    activeBlock,
    setOnSave,
    isEditable,
    setIsEditable,
  } = useContext(useGlobalContext)

  const onClickSave = async () => {
    if (isEditable === false) return

    setOnSave(true)
    try {
      const result = await xUpdateNote(note?.note_id, {
        name: note?.name,
        content: editor.getHTML(),
        version: note?.version,
      })
      setNote({
        ...note,
        content: editor.getHTML(),
        version: result.version,
      })
      setConflict(null)
      if (activeBlock === 'sharedWithMe' || activeBlock === 'readShare') {
        await getSharedWithMe()
      } else {
        await getNotes()
      }
    } catch (err) {
      if (err.response?.status === 409 && err.response?.data?.currentNote) {
        setConflict(err.response.data.currentNote)
      } else {
        toast({
          title: 'Error',
          description:
            err.response?.data?.message ||
            err.response?.data ||
            'Save note failed. Please retry.',
          variant: 'danger',
        })
      }
    }

    setOnSave(false)
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex gap-[6px] items-center'>
        <Button
          className='w-full capitalize bg-[#1e1e1e] text-white hover:bg-[#333] hover:text-white hover:shadow-none'
          variant={'default'}
          size={'sm'}
          onClick={() => setIsEditable(!isEditable)}
        >
          {isEditable ? (
            <>
              <img
                width='24'
                height='24'
                src='/flask-pink-600.png'
                alt='external-Flask-back-to-school-jumpicon-(solid-gradient)-jumpicon-solid-gradient-ayub-irawan'
              />
              &nbsp;&nbsp;Lock
            </>
          ) : (
            <>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-6 w-6 text-pink-600 -rotate-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
                />
              </svg>
              &nbsp;&nbsp;Unlock
            </>
          )}
        </Button>

        {isEditable && (
          <button
            type='button'
            className='relative inline-block cursor-pointer border-[0.125em] border-pink-500 px-[1em] py-[0.25em] rounded-[0.25em] text-3rem text-pink-500 hover:text-pink-600 hover:border-pink-600'
            onClick={onClickSave}
          >
            Save
          </button>
        )}
      </div>

      {conflict && (
        <div
          className='flex flex-col gap-2 rounded-md border border-amber-500/50 bg-amber-500/10 p-3 text-sm text-white'
          role='alert'
        >
          <p>
            Someone saved a newer version. Your unsaved draft is still here;
            reloading replaces it with the latest version.
          </p>
          <Button
            type='button'
            size='sm'
            variant='secondary'
            onClick={() => {
              setNote(conflict)
              editor.commands.setContent(conflict.content || '', false)
              setConflict(null)
            }}
          >
            Reload latest version
          </Button>
        </div>
      )}
    </div>
  )
}

export default LockMenus

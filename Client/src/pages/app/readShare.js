import { NoteEditor } from '../../components/noteEditor'
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useToast } from '../../components/ui/use-toast'
import { useGlobalContext } from '../../api/useGlobalContext'
import { xGetShare } from '../../api/fetch'

function ReadShare() {
  const {
    note,
    setNote,
    setActiveBlock,
    isActiveNote,
    setIsActiveNote,
    setIsEditable,
  } = useContext(useGlobalContext)
  const { shareId } = useParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)

  const fetchNote = async () => {
    setTimeout(() => {
      xGetShare(shareId)
        .then((res) => {
          if (res.data.deleted === 1) {
            toast({
              title: "Note is in owner's trash",
              variant: 'danger',
            })
          } else {
            setNote(res.data)
            setIsEditable(
              res.data.permission === 'owner' ||
                res.data.permission === 'editor'
            )
            setIsActiveNote(true)
          }
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          toast({
            title: 'Note not found',
            variant: 'danger',
          })
        })
    }, 50)
  }

  useEffect(() => {
    setActiveBlock('readShare')
    setIsActiveNote(false)
    setIsEditable(false)
    setNote({})

    setLoading(true)
    fetchNote()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shareId])

  return (
    <>
      {loading ? (
        <div className='flex items-center justify-center w-full h-screen'>
          <div className='flex flex-col items-center gap-4'>
            <div className='flex items-center'>
              <h1 className='text-[22px]'>Loading...</h1>
            </div>
            <p className='lg:w-[600px]  px-2  text-[22px] text-center font-normal text-white/[60%]'>
              {/* Please wait while we load the note you are looking for ... */}
            </p>
          </div>
        </div>
      ) : isActiveNote ? (
        <NoteEditor folder_id={note?.folder_id} />
      ) : (
        <>
          <div className='flex items-center justify-center w-full h-screen'>
            <div className='flex flex-col items-center gap-4'>
              <div className='flex items-center'>
                <h1 className='font-semibold text-[92px]'>404</h1>
                <img alt='icon' src={'/FileText.svg'} height={80} width={80} />
              </div>
              <p className='lg:w-[600px]  px-2  text-[20px] text-center font-normal text-white/[60%]'>
                We can't find the note you're looking for; it may have been
                moved to the trash or deleted. Please contact the note owner
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ReadShare

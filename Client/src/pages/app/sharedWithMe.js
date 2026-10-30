import React, { useContext, useEffect } from 'react'
import { FiUsers } from 'react-icons/fi'
import { NoteEditor } from '../../components/noteEditor'
import NoteList from '../../components/noteList'
import { useGlobalContext } from '../../api/useGlobalContext'

const SharedWithMe = () => {
  const {
    sharedWithMe,
    note,
    setNote,
    isActiveNote,
    setIsActiveNote,
    activeBlock,
    setActiveBlock,
    setIsEditable,
  } = useContext(useGlobalContext)

  useEffect(() => {
    setActiveBlock('sharedWithMe')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectSharedNote = (selectedNote) => {
    setNote(selectedNote)
    setIsEditable(selectedNote.permission === 'editor')
    setIsActiveNote(true)
  }

  return (
    <>
      <NoteList
        icon={<FiUsers className='mr-3 h-6 w-6 text-blue-400' />}
        title='Shared with me'
        array={sharedWithMe}
        note={note}
        setNote={selectSharedNote}
        isActiveNote={isActiveNote}
        setIsActiveNote={setIsActiveNote}
        activeBlock={activeBlock}
      />
      {isActiveNote ? (
        <div className='flex w-full flex-col'>
          <p className='px-5 pt-4 text-sm text-white/[60%]'>
            Shared by {note.owner_username} ·{' '}
            {note.permission === 'editor' ? 'Editor access' : 'Viewer access'}
          </p>
          <NoteEditor folder_id={note?.folder_id} />
        </div>
      ) : (
        <div className='hidden w-[calc(100vw-650px)] flex-col items-center justify-center gap-[10px] lg:flex'>
          <img alt='icon' src='/FileText.svg' height={80} width={80} />
          <h2 className='text-[28px] font-semibold'>Select a shared note</h2>
          <p className='text-center font-normal text-white/[60%]'>
            Notes shared with your account will appear here.
          </p>
        </div>
      )}
    </>
  )
}

export default SharedWithMe

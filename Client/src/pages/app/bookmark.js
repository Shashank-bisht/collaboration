import React, { useEffect, useContext } from 'react'
import NoteList from '../../components/noteList'
import { NoteEditor } from '../../components/noteEditor'
import { FiBookmark } from 'react-icons/fi'

import { useGlobalContext } from '../../api/useGlobalContext'

const Bookmarks = () => {
  const {
    bookmarks,
    note,
    setNote,
    isActiveNote,
    setIsActiveNote,
    activeBlock,
    setActiveBlock,
  } = useContext(useGlobalContext)

  useEffect(() => {
    setActiveBlock('bookmark')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NoteList
        icon={<FiBookmark className='text-pink-400 mr-3 h-6 w-6' />}
        title='Bookmark'
        array={bookmarks}
        note={note}
        setNote={setNote}
        isActiveNote={isActiveNote}
        setIsActiveNote={setIsActiveNote}
        activeBlock={activeBlock}
      />

      {isActiveNote ? (
        <NoteEditor folder_id={note?.folder_id} />
      ) : (
        <div className='lg:flex hidden flex-col gap-[10px] items-center justify-center w-[calc(100vw-650px)]'>
          <img alt='icon' src={'/FileText.svg'} height={80} width={80} />
          <h2 className='font-semibold text-[28px]'>Select note to view</h2>
          <p className='lg:w-[460px] text-center font-normal text-white/[60%]'>
            Choose a note from the list on the left to view its contents, or
            create a new note to add to your collection.
          </p>
        </div>
      )}
    </>
  )
}

export default Bookmarks

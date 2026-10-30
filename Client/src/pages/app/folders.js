import React, { useState, useEffect, useContext } from 'react'
import { AiFillFolderOpen } from 'react-icons/ai'
import { NoteEditor } from '../../components/noteEditor'
import NoteList from '../../components/noteList'
import { useGlobalContext } from '../../api/useGlobalContext'

import { useParams } from 'react-router-dom'

const Folders = () => {
  const { folderId } = useParams()
  const {
    folders,
    notes,
    isActiveNote,
    setIsActiveNote,
    note,
    setNote,
    activeBlock,
    setActiveBlock,
  } = useContext(useGlobalContext)
  const [title, setTitle] = useState('loading...')

  useEffect(() => {
    setActiveBlock('folder')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTitle(folders?.filter((obj) => obj.folder_id === folderId)[0]?.name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folders, activeBlock, folderId])

  // const addToRecent = useRecentStore((state) => state.addToRecents)
  const notesList = notes?.filter(
    (obj) => obj.folder_id === folderId && obj.deleted === 0
  )

  return (
    <>
      <NoteList
        icon={<AiFillFolderOpen className='mr-3 h-6 w-6 text-orange-300' />}
        title={title}
        array={notesList}
        note={note}
        setNote={setNote}
        isActiveNote={isActiveNote}
        setIsActiveNote={setIsActiveNote}
        activeBlock={activeBlock}
      />
      {isActiveNote ? (
        <>
          <NoteEditor folder_id={folderId} />
        </>
      ) : (
        <div className='lg:flex hidden flex-col gap-[10px] items-center justify-center w-[calc(100vw-650px)]'>
          <img alt='icon' src={'/FileText.svg'} height={80} width={80} />
          <h2 className='font-semibold text-[28px]'>Select note to view</h2>
          <p className='w-[460px] text-center font-normal text-white/[60%]'>
            Choose a note from the list on the left to view its contents, or
            create a new note to add to your collection.
          </p>
        </div>
      )}
    </>
  )
}

export default Folders

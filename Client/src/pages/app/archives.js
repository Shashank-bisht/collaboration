import React, { useEffect, useContext } from 'react'
import { FcSynchronize } from 'react-icons/fc'
import { useGlobalContext } from '../../api/useGlobalContext'
import ArchiveMenu from '../../components/archive/archiveMenu'
import NoteList from '../../components/noteList'

const Archives = () => {
  const {
    archive,
    note,
    setNote,
    isActiveNote,
    setIsActiveNote,
    setActiveBlock,
    activeBlock,
  } = useContext(useGlobalContext)

  useEffect(() => {
    setActiveBlock('archive')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NoteList
        icon={<FcSynchronize className='text-rose-400 mr-3 h-6 w-6' />}
        title='Archive'
        array={archive}
        note={note}
        setNote={setNote}
        isActiveNote={isActiveNote}
        setIsActiveNote={setIsActiveNote}
        activeBlock={activeBlock}
      />
      {isActiveNote ? (
        <ArchiveMenu />
      ) : (
        <div className='lg:flex hidden flex-col gap-[10px] items-center justify-center w-[calc(100vw-650px)]'>
          <img alt='icon' src={'/FileText.svg'} height={80} width={80} />
          <h2 className='font-semibold text-[28px]'>
            Select note to Unarchive
          </h2>
          <p className='lg:w-[460px] text-center font-normal text-white/[60%]'>
            Select a note from the list on the left for unarchive note.
          </p>
        </div>
      )}
    </>
  )
}

export default Archives

import React, { useEffect, useContext } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import NoteList from '../../components/noteList'
import TrashMenu from '../../components/trash/trashMenu'

import { useGlobalContext } from '../../api/useGlobalContext'

const Trashs = () => {
  const {
    trash,
    note,
    setNote,
    isActiveNote,
    setIsActiveNote,
    activeBlock,
    setActiveBlock,
  } = useContext(useGlobalContext)

  useEffect(() => {
    setActiveBlock('trash')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NoteList
        icon={<AiFillDelete className='text-rose-400 mr-3 h-6 w-6' />}
        title='Trash'
        array={trash}
        note={note}
        setNote={setNote}
        isActiveNote={isActiveNote}
        setIsActiveNote={setIsActiveNote}
        activeBlock={activeBlock}
      />
      {isActiveNote ? (
        <TrashMenu />
      ) : (
        <div className='lg:flex hidden flex-col gap-[10px] items-center justify-center w-[calc(100vw-650px)]'>
          <img alt='icon' src={'/FileText.svg'} height={80} width={80} />
          <h2 className='font-semibold text-[28px]'>Select note to restore</h2>
          <p className='lg:w-[460px] text-center font-normal text-white/[60%]'>
            Select a note from the list on the left for restoring note.
          </p>
        </div>
      )}
    </>
  )
}

export default Trashs

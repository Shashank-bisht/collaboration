import React, { useEffect, useContext } from 'react'
import { FiLink } from 'react-icons/fi'
import { NoteEditor } from '../../components/noteEditor'
import NoteList from '../../components/noteList'

import { useGlobalContext } from '../../api/useGlobalContext'

const Shares = () => {
  const {
    notes,
    archive,
    trash,
    note,
    setNote,
    shares,
    isActiveNote,
    setIsActiveNote,
    activeBlock,
    setActiveBlock,
  } = useContext(useGlobalContext)

  const [sharedNotes, setSharedNotes] = React.useState([])

  function assignValue() {
    const temp = []
    for (const share of shares) {
      const matchingNote = [...notes, ...archive, ...trash].find(
        (note) => note.note_id === share.note_id
      )
      if (matchingNote) {
        const sharedNote = { ...matchingNote, share_id: share.share_id }
        temp.push(sharedNote)
      }
    }

    setSharedNotes(temp)
  }

  useEffect(() => {
    assignValue()
    setActiveBlock('shared')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    assignValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shares, notes, archive, trash])

  return (
    <>
      <NoteList
        icon={<FiLink className='text-blue-400 mr-3 h-6 w-6' />}
        title='Shared'
        array={sharedNotes}
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

export default Shares

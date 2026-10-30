import React, { useEffect, useState, useContext } from 'react'
import { LuCalendarDays } from 'react-icons/lu'
import { AiFillFolder } from 'react-icons/ai'
import { dateToString } from '../../lib/utils'
import { Loader2 } from 'lucide-react'
import Editable from '../ui/editable'
import useNoteEditor from '../noteEditor/editor'
import { NoteMenuList } from '../noteEditor/noteMenuLists'
import EditorToolbar from '../noteEditor/editor/editorToolbar'
import BubbleEditor from '../noteEditor/editor/bubbleEditor'
import { EditorTipTap } from '../noteEditor/editor/editorTipTap'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { IoChevronBackOutline } from 'react-icons/io5'
import AddToFolder from './noteMenuLists/menus/addToFolder'
import SharedNotePresence, {
  useSharedNoteEditing,
} from './sharedNotePresence'

import { useGlobalContext } from '../../api/useGlobalContext'

export const NoteEditorMobile = ({ folder_id }) => {
  const {
    folders,
    isActiveNote,
    activeBlock,
    setIsActiveNote,
    getBookmarks,
    note,
    setNote,
    shares,
    isError,
    getNotes,
    onSave,
    isEditable,
  } = useContext(useGlobalContext)

  const [isEdit, setIsEdit] = useState(isEditable)
  const [title, setTitle] = useState(note?.name || '')
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const { isEditing, markEditing } = useSharedNoteEditing(isEditable)

  let editor = useNoteEditor({ onEdit: markEditing })
  const folder = folders.find((f) => f.folder_id === note?.folder_id)
  const shareId =
    note?.share_id ||
    shares.find((share) => share.note_id === note?.note_id)?.share_id

  useEffect(() => {
    if (note) {
      setTitle(note.name)
      editor?.commands.setContent(`${note.content}`, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note])

  return (
    <>
      {isActiveNote && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0 }}
            exit={{ opacity: 0 }}
            key={'note-lists'}
          >
            <div className='h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden w-full px-[20px]'>
              <header className='sticky top-0 bg-background pt-[20px]'>
                <div className='flex items-center gap-5 mb-[20px] relative'>
                  <Editable
                    className={`lg:text-[22px] text-lg text-white font-semibold w-full border-white/[5%] border-b  ${
                      onSave && 'opacity-10 blur-sm'
                    } ${isError && 'border-red-500 border-b'}`}
                    value={title}
                    maxLength={50}
                    isEdit={isEditable && isEdit}
                    setIsEdit={setIsEdit}
                    isEditable={isEditable}
                    onChange={(e) => {
                      markEditing()
                      setTitle(e.target.value)
                    }}
                    onBlur={async () => {
                      note.name = title
                      setIsEdit(false)
                    }}
                    readOnly={!isEditable}
                  />
                  {onSave && (
                    <div className='absolute inset-0 flex justify-center'>
                      <div className='flex items-center'>
                        <Loader2 className='animate-spin h-6 w-6 mr-2' />
                        <p>Saving note ....</p>
                      </div>
                    </div>
                  )}
                  <NoteMenuList
                    data={note}
                    getNotes={getNotes}
                    getBookmarks={getBookmarks}
                    setNote={setNote}
                    shares={shares}
                    activeBlock={activeBlock}
                    setIsActiveNote={setIsActiveNote}
                  />
                </div>
                {shareId && (
                  <div className='mb-4'>
                    <SharedNotePresence
                      shareId={shareId}
                      status={isEditing ? 'editing' : 'viewing'}
                    />
                  </div>
                )}
                <div className='flex flex-col gap-5 justify-center'>
                  {!isEditable ? (
                    <>
                      <div className='flex gap-[10px] mb-5 items-center'>
                        <LuCalendarDays className='text-[20px]' />
                        <p className='font-semibold text-white/[60%] w-[100px] text-[14px]'>
                          Date
                        </p>
                        <p className='font-semibold text-white lg:text-base text-sm'>
                          {dateToString({ values: note?.created_date })}
                        </p>
                      </div>
                    </>
                  ) : activeBlock === 'readShare' ||
                    activeBlock === 'sharedWithMe' ||
                    activeBlock === 'bookmark' ? null : (
                    <div className='flex gap-[10px] mb-5  items-center'>
                      <AiFillFolder className='text-[20px] text-orange-300' />
                      <p className='font-semibold text-white/[60%] w-[100px] text-[14px]'>
                        Folder
                      </p>
                      <p
                        className='font-semibold text-white cursor-pointer hover:text-white lg:text-base text-sm'
                        onClick={() => {
                          setIsOpenDialog(true)
                        }}
                      >
                        {folder?.name}
                      </p>
                    </div>
                  )}
                </div>

                {activeBlock === 'bookmark' ||
                (activeBlock === 'sharedWithMe' && !isEditable) ||
                (activeBlock === 'readShare' && !isEditable) ? null : (
                  <EditorToolbar editor={editor} isEditable={isEditable} />
                )}
              </header>
              <BubbleEditor editor={editor} />
              <EditorTipTap editor={editor} />
            </div>
          </motion.div>
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

          <AddToFolder
            open={isOpenDialog}
            setOpen={setIsOpenDialog}
            method='move'
          />
        </>
      )}
    </>
  )
}

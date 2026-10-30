import React, { useEffect, useState, useContext } from 'react'
import { Loader2 } from 'lucide-react'

import { LuCalendarDays } from 'react-icons/lu'
import { dateToString } from '../../lib/utils'
import Editable from '../ui/editable'
import useNoteEditor from './editor'
import EditorToolbar from './editor/editorToolbar'
import { EditorTipTap } from './editor/editorTipTap'
import BubbleEditor from './editor/bubbleEditor'
import { NoteMenuList } from './noteMenuLists'
import AddToFolder from './noteMenuLists/menus/addToFolder'
import { AiFillFolder } from 'react-icons/ai'
import { useMediaQuery } from 'react-responsive'
import { NoteEditorMobile } from './mobile'
import SharedNotePresence, {
  useSharedNoteEditing,
} from './sharedNotePresence'
import { useGlobalContext } from '../../api/useGlobalContext'

export const NoteEditor = ({ folder_id }) => {
  const {
    folders,
    activeBlock,
    setIsActiveNote,
    note,
    shares,
    setNote,
    getNotes,
    getBookmarks,
    onSave,
    isEditable,
  } = useContext(useGlobalContext)

  const [isEdit, setIsEdit] = useState(isEditable) // temp state only for title
  const [title, setTitle] = useState(note?.name || '')
  const [isError, setIsError] = useState(false)
  const isBigScreen = useMediaQuery({ minWidth: 1024 })

  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const { isEditing, markEditing } = useSharedNoteEditing(isEditable)

  let editor = useNoteEditor({ onEdit: markEditing })

  useEffect(() => {
    setTitle(note?.name)
    setIsError(false)
  }, [note])

  const folder = folders.find((f) => f.folder_id === note?.folder_id)
  const shareId =
    note?.share_id ||
    shares.find((share) => share.note_id === note?.note_id)?.share_id

  if (!isBigScreen) return <NoteEditorMobile folder_id={folder_id} />

  return (
    <>
      <div
        className={
          // readShare is a special case, it doesn't have a list of notes on the left side so we need to make the editor full width to fill the screen
          (activeBlock === 'readShare' ? '' : 'lg:w-[calc(100vw-650px)] ') +
          'w-full px-[50px] lg:h-screen h-[calc(100vh-80px)] overflow-y-auto'
        }
      >
        <header className='sticky top-0 bg-background pt-[30px]'>
          <div className='flex justify-between items-center gap-5 mb-[20px] relative'>
            <Editable
              className={`text-[30px] text-white font-semibold w-full border-white/[5%] border-b  ${
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
                  <p className='font-semibold text-white'>
                    {dateToString({ values: note?.created_date })}
                  </p>
                </div>
                {/* <Dvider /> */}
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
                  className='font-semibold text-white cursor-pointer hover:text-white text-[16px]'
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

      <AddToFolder
        open={isOpenDialog}
        setOpen={setIsOpenDialog}
        method='move'
      />
    </>
  )
}

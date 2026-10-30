import React from 'react'
import { DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu'
import { SlOptions } from 'react-icons/sl'
import { LuLink2Off } from 'react-icons/lu'
import {
  FiArchive,
  FiStar,
  FiFolderPlus,
  FiBookmark,
  FiTrash,
  FiLink,
  FiCopy,
} from 'react-icons/fi'
import { TbBookmarkOff } from 'react-icons/tb'
import Dvider from '../../ui/dvider'
import {
  DropdownMenu,
  DropdownMenuContent,
} from '@radix-ui/react-dropdown-menu'
import { Transition } from '@headlessui/react'
import { useToast } from '../../ui/use-toast'
import { xUpdateNote, xAddBookmark, xRemoveBookmark } from '../../../api/fetch'

import AddToFolder from './menus/addToFolder'
import MoveToTrash from './menus/moveToTrash'
import MoveToArchive from './menus/moveToArchive'
import ShareLink from './menus/shareLink'

export const NoteMenuList = ({
  data,
  getNotes,
  getBookmarks,
  setNote,
  shares,
  activeBlock,
  setIsActiveNote,
}) => {
  const [open, setOpen] = React.useState(false)

  const [dialog, setDialog] = React.useState(null) // archive, trash
  const [isOpenDialog, setIsOpenDialog] = React.useState(false)

  const { toast } = useToast()

  const openDialog = (name) => {
    setOpen(false)
    setDialog(name)
    setIsOpenDialog(false)
    window.setTimeout(() => setIsOpenDialog(true), 0)
  }

  const handleAddToFavorite = async () => {
    try {
      await xUpdateNote(data?.note_id, {
        favorite: 1,
      })
      getNotes()
      setNote({ ...data, favorite: 1 })
      toast({
        title: 'Add to favorite Successfully',
        variant: 'success',
      })
    } catch (err) {
      toast({
        title: 'Failed to add',
        description: err.response.data,
        variant: 'danger',
      })
    }
  }

  const handleRemoveFavorite = async () => {
    try {
      await xUpdateNote(data?.note_id, {
        favorite: 0,
      })
      if (activeBlock !== 'folder') {
        setIsActiveNote(false)
      }
      getNotes()
      setNote({ ...data, favorite: 0 })
      toast({
        title: 'Remove from favorite Successfully',
        variant: 'success',
      })
    } catch (err) {
      toast({
        title: 'Failed to remove',
        description: err.response.data,
        variant: 'danger',
      })
    }
  }

  const handleAddToBookmark = async () => {
    try {
      await xAddBookmark({ share_id: data?.share_id })

      getBookmarks()

      toast({
        title: 'Add to bookmark Successfully',
        variant: 'success',
      })
    } catch (err) {
      toast({
        title: 'Failed to add',
        description: err.response.data,
        variant: 'danger',
      })
    }
  }

  const handleRemoveBookmark = async () => {
    try {
      await xRemoveBookmark(data?.bookmark_id)

      setIsActiveNote(false)
      getBookmarks()
      toast({
        title: 'Remove Successfully',
        variant: 'success',
      })
    } catch (err) {
      toast({
        title: 'Failed to remove',
        description: 'err.response.data',
        variant: 'danger',
      })
    }
  }

  const share = shares?.find((item) => item.note_id === data?.note_id)
  const shareId = data?.share_id || share?.share_id

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className='focus-visible:ring-0 focus-visible:ring-offset-0 outline-none lg:p-[10px] p-[7px] border-[1px] border-white/[50%] rounded-full cursor-pointer'>
          <SlOptions />
        </DropdownMenuTrigger>
        <Transition
          show={open}
          enter='transition duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          className='absolute z-[1]'
        >
          <DropdownMenuContent className='bg-[#333333] p-[15px] translate-y-4 rounded-xl text-white min-w-[200px] absolute right-0 translate-x-5'>
            {activeBlock === 'readShare' ||
            activeBlock === 'bookmark' ||
            activeBlock === 'sharedWithMe' ? (
              <div className='flex flex-col gap-[5px]'>
                <DropdownMenuItem
                  className='focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]'
                  onClick={() => openDialog('folder')}
                >
                  <div className='flex items-center gap-[15px]'>
                    <div className='text-[20px]'>
                      <FiFolderPlus />
                    </div>
                    <p className='truncate'>Add to Folder</p>
                  </div>
                </DropdownMenuItem>

                <CopyToClipboard
                  shareLink={`${window.location.origin}/app/share/${shareId}`}
                />

                <Dvider />
                <DropdownMenuItem
                  className='focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]'
                  onClick={
                    activeBlock !== 'bookmark'
                      ? handleAddToBookmark
                      : handleRemoveBookmark
                  }
                >
                  <div className='flex items-center gap-[15px]'>
                    <div className='text-[20px]'>
                      {activeBlock !== 'bookmark' ? (
                        <FiBookmark />
                      ) : (
                        <TbBookmarkOff />
                      )}
                    </div>
                    <p className='truncate'>
                      {activeBlock !== 'bookmark'
                        ? 'Add to bookmark'
                        : 'Remove bookmark'}
                    </p>
                  </div>
                </DropdownMenuItem>
              </div>
            ) : (
              <div className='flex flex-col gap-[5px]'>
                <DropdownMenuItem
                  className='focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]'
                  onClick={
                    data?.favorite === 1
                      ? () => handleRemoveFavorite()
                      : () => handleAddToFavorite()
                  }
                >
                  <div className='flex items-center gap-[15px]'>
                    <div className='text-[20px]'>
                      <FiStar />
                    </div>
                    <p className='truncate'>
                      {data?.favorite === 1 ? 'Remove from' : 'Add to'} favorite
                    </p>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className='focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]'
                  onClick={() => openDialog('archive')}
                >
                  <div className='flex items-center gap-[15px]'>
                    <div className='text-[20px]'>
                      <FiArchive />
                    </div>
                    <p className='truncate'>Move to archive</p>
                  </div>
                </DropdownMenuItem>

                <Dvider />
                {share?.note_id === data?.note_id ? (
                  <CopyToClipboard
                    shareLink={`${window.location.origin}/app/share/${shareId}`}
                  />
                ) : null}

                <DropdownMenuItem
                  className='focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]'
                  onClick={() => openDialog('link')}
                >
                  <div className='flex items-center gap-[15px]'>
                    <div className='text-[20px]'>
                      {share?.note_id === data?.note_id ? (
                        <LuLink2Off />
                      ) : (
                        <FiLink />
                      )}
                    </div>
                    <p className='truncate'>
                      {share?.note_id === data?.note_id
                        ? 'Manage access'
                        : 'Share with accounts'}
                    </p>
                  </div>
                </DropdownMenuItem>

                <Dvider />
                <DropdownMenuItem
                  className='focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]'
                  onClick={() => openDialog('trash')}
                >
                  <div className='flex items-center gap-[15px]'>
                    <div className='text-[20px]'>
                      <FiTrash />
                    </div>
                    <p className='truncate'>Move to trash</p>
                  </div>
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </Transition>
      </DropdownMenu>

      {dialog === 'folder' ? (
        <AddToFolder
          open={isOpenDialog}
          setOpen={setIsOpenDialog}
          method='copy'
        />
      ) : dialog === 'archive' ? (
        <MoveToArchive open={isOpenDialog} setOpen={setIsOpenDialog} />
      ) : dialog === 'trash' ? (
        <MoveToTrash open={isOpenDialog} setOpen={setIsOpenDialog} />
      ) : dialog === 'link' ? (
        <ShareLink
          open={isOpenDialog}
          setOpen={setIsOpenDialog}
          data={data}
          share={share}
        />
      ) : null}
    </>
  )
}

export const CopyToClipboard = ({ shareLink }) => {
  const { toast } = useToast()
  return (
    <DropdownMenuItem
      className='focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]'
      onClick={() => {
        try {
          navigator.clipboard.writeText(shareLink)
          toast({
            title: 'Link copied to clipboard',
            variant: 'success',
          })
        } catch (err) {
          toast({
            title: 'Failed to copy',
            description: shareLink,
            variant: 'danger',
          })
        }
      }}
    >
      <div className='flex items-center gap-[15px]'>
        <div className='text-[20px]'>
          <FiCopy />
        </div>
        <p className='truncate'>Copy link</p>
      </div>
    </DropdownMenuItem>
  )
}

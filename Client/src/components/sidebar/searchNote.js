import React, { useState, useMemo, useContext } from 'react'
import { Button } from '../ui/button'
import { FiFolder, FiSearch, FiX } from 'react-icons/fi'
import { FiFileText } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import * as NProgress from 'nprogress'
import { create } from 'zustand'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { AiFillStar } from 'react-icons/ai'

import { useGlobalContext } from '../../api/useGlobalContext'

const useSearchState = create((set) => ({
  search: '',
  setSearch: (val) => set(() => ({ search: val })),
  clearSearch: () => set({ search: '' }),

  isWaiting: false,
  setWaiting: (status) => set({ isWaiting: status }),

  loading: {},
  setLoading: (id) =>
    set((state) => ({ loading: { ...state.loading, [id]: true } })),
  doneLoading: () => set({ loading: {} }),
}))

const useSearchStateHook = () => {
  const { setIsSidebarOpen, setIsActiveNote, setNote } =
    useContext(useGlobalContext)

  const setSidebar = (state) => setIsSidebarOpen(state)
  const setActiveNote = (state) => setIsActiveNote(state)
  const setCurNote = (state) => setNote(state)
  const clearSearch = useSearchState((state) => state.clearSearch)
  const isWaiting = useSearchState((state) => state.isWaiting)
  const setWaiting = useSearchState((state) => state.setWaiting)
  const loading = useSearchState((state) => state.loading)
  const setLoading = useSearchState((state) => state.setLoading)
  const doneLoading = useSearchState((state) => state.doneLoading)
  return {
    setSidebar,
    setActiveNote,
    setCurNote,
    clearSearch,
    isWaiting,
    setWaiting,
    loading,
    setLoading,
    doneLoading,
  }
}

const RenderFolderItem = ({ title, data, icon, setOpen }) => {
  const {
    setSidebar,
    setActiveNote,
    setCurNote,
    setLoading,
    clearSearch,
    loading,
    doneLoading,
    setWaiting,
    isWaiting,
  } = useSearchStateHook()
  const Navigate = useNavigate()

  const redirectTo = (item) => {
    NProgress.start()
    setTimeout(() => {
      setActiveNote(false)
      setCurNote({})
      Navigate(`/app/folders/${item.folder_id}`)
      NProgress.done()
    }, 1000)
  }

  const handlePushRoute = async (item) => {
    setLoading(item.folder_id)
    setWaiting(true)
    await redirectTo(item)
    setOpen(false)
    setWaiting(false)
    doneLoading()
    clearSearch()
    setSidebar(false)
  }

  return (
    <>
      {data?.length !== 0 ? (
        <>
          <div className='flex flex-col px-[20px]'>
            <div className='flex items-center'>
              <p className='inactive-text text-sm pb-1 mr-4'>{title}</p>
              <div className='bg-white/[20%] w-full h-[1px]'></div>
            </div>
            {data?.map((item, i) => (
              <div
                className={`hover:bg-white/[5%] py-3 rounded-md transition px-3 cursor-pointer relative  ${
                  loading[item.folder_id] ? 'opacity-50' : ''
                } ${isWaiting && 'pointer-events-none cursor-default'} `}
                key={i}
                onClick={() => handlePushRoute(item)}
              >
                <div className='flex gap-[20px] items-center'>
                  {icon}
                  <p className='truncate lg:text-base text-sm'>{item.name}</p>
                </div>
                {loading[item.folder_id] === true && (
                  <div className='absolute inset-y-0 right-0 flex items-center -translate-x-5'>
                    <Loader2 className='animate-spin' />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  )
}

const RenderNoteItem = ({ title, data, icon, setOpen }) => {
  const {
    setSidebar,
    setActiveNote,
    setCurNote,
    setLoading,
    clearSearch,
    loading,
    doneLoading,
    setWaiting,
    isWaiting,
  } = useSearchStateHook()
  const Navigate = useNavigate()

  const handlePushRoute = async (item) => {
    setLoading(item.note_id)
    setActiveNote(null)
    setWaiting(true)
    NProgress.start()
    Navigate(`/app/folders/${item.folder_id}`)
    setCurNote(item)
    setActiveNote(true)
    setOpen(false)
    setWaiting(false)
    doneLoading()
    NProgress.done()
    clearSearch()
    setSidebar(false)
  }

  return (
    <>
      {data?.length !== 0 ? (
        <>
          <div className='flex flex-col px-[20px]'>
            <div className='flex items-center'>
              <p className='inactive-text text-sm pb-1 mr-4'>{title}</p>
              <div className='bg-white/[20%] w-full h-[1px]'></div>
            </div>
            {data?.map((item, i) => (
              <div
                className={`hover:bg-white/[5%] py-3 rounded-md transition px-3 cursor-pointer relative ${
                  loading[item.note_id] && item.deleted === 0
                    ? 'opacity-50'
                    : ''
                } ${isWaiting && 'pointer-events-none cursor-default'} `}
                key={i}
                onClick={() => handlePushRoute(item)}
              >
                <div className='flex gap-[20px] items-center'>
                  {icon}
                  <p className='truncate lg:text-base text-sm'>{item.name}</p>
                  {item.favorite === 1 && (
                    <AiFillStar className='h-4 w-4 text-yellow-300' />
                  )}
                </div>
                {loading[item.note_id] && item.deleted === 0 && (
                  <div className='absolute inset-y-0 right-0 flex items-center -translate-x-5'>
                    <Loader2 className='animate-spin' />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  )
}

const RenderNoteOnMore = ({ title, data, redirect, icon, setOpen }) => {
  const {
    setSidebar,
    setActiveNote,
    setCurNote,
    setLoading,
    clearSearch,
    loading,
    doneLoading,
    setWaiting,
    isWaiting,
  } = useSearchStateHook()

  const Navigate = useNavigate()
  const _setCurNote = (item) => {
    setTimeout(() => {
      setActiveNote(true)
      setCurNote(item)
    }, 500)
  }

  const handlePushRoute = async (item) => {
    NProgress.start()
    Navigate(redirect)
    setLoading(item.note_id)
    setWaiting(true)
    await _setCurNote(item)
    setOpen(false)
    NProgress.done()
    doneLoading()
    clearSearch()
    setWaiting(false)
    setSidebar(false)
  }
  return (
    <>
      {data?.length !== 0 ? (
        <>
          <div className='flex flex-col px-[20px]'>
            <div className='flex items-center'>
              <p className='inactive-text text-sm pb-1 mr-4'>{title}</p>
              <div className='bg-white/[20%] w-full h-[1px]'></div>
            </div>
            {data?.map((item, i) => (
              <div
                className={`hover:bg-white/[5%] py-3 rounded-md transition px-3 cursor-pointer relative ${
                  loading[item.note_id] && item.deleted !== 0
                    ? 'opacity-50'
                    : ''
                } ${isWaiting && 'cursor-default pointer-events-none'}`}
                key={i}
                onClick={() => handlePushRoute(item)}
              >
                <div className='flex gap-[20px] items-center'>
                  {icon}
                  <p className='truncate lg:text-base text-sm'>{item.name}</p>
                </div>
                {loading[item.note_id] && item.deleted !== 0 && (
                  <div className='absolute inset-y-0 right-0 flex items-center -translate-x-5'>
                    <Loader2 className='animate-spin' />
                  </div>
                )}
              </div>
            ))}
            {data.length === 0 && (
              <p className='text-center text-sm inactive-text'>
                Trash is empty
              </p>
            )}
          </div>
        </>
      ) : null}
    </>
  )
}

function SearchNote() {
  const [open, setOpen] = useState(false)
  const { folders, notes, archive, trash } = useContext(useGlobalContext)
  const search = useSearchState((state) => state.search)
  const setSearch = useSearchState((state) => state.setSearch)
  const clearSearch = useSearchState((state) => state.clearSearch)

  const searchFolderData = useMemo(() => {
    if (!search) return folders
    const res = folders.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    )
    return res
  }, [search, folders])

  const searchNoteData = useMemo(() => {
    const findNotes = notes

    if (!search) {
      const sorting = findNotes.sort((a, b) => {
        if (a.favorite === b.favorite) {
          return 0
        }
        if (a.favorite) {
          return -1
        }
        return 1
      })
      return sorting
    }

    const res = findNotes.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    )
    const sorting = res.sort((a, b) => {
      if (a.favorite === b.favorite) {
        return 0
      }
      if (a.favorite) {
        return -1
      }
      return 1
    })
    return sorting
  }, [search, notes])

  const searchNoteOnArchive = useMemo(() => {
    const findNotes = archive
    if (!search) return findNotes
    const res = findNotes.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    )
    return res
  }, [search, archive])

  const searchNoteOnTrash = useMemo(() => {
    const findNotes = trash
    if (!search) return findNotes
    const res = findNotes.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    )
    return res
  }, [search, trash])

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size='sm' variant='ghost'>
            <FiSearch className='text-[20px]' />
          </Button>
        </DialogTrigger>
        <DialogContent className='fixed left-[50%] top-[50%] grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full p-0 border lg:max-w-[520px] max-w-[350px] border-white/[30%] lg:h-[400px] h-[300px] overflow-auto custom-scrollbar z-50'>
          <div>
            <div className='flex justify-between z-50 items-center px-[20px] sticky top-0 right-0 left-0 bg-background border-b border-white/[20%]'>
              <div className='flex items-center gap-4 w-full py-[20px]'>
                <FiSearch className='text-[20px]' />
                <input
                  type='text'
                  className='w-full bg-background text-white outline-none'
                  placeholder='Type a note or folder.....'
                  onChange={(e) => setSearch(e.target.value)}
                  maxLength={30}
                  autoFocus
                  spellCheck={false}
                  autoComplete='false'
                />
              </div>
              <Button
                size='sm'
                variant='ghost'
                className='outline-none border-none ring-0 px-[10px] py-[10px]'
                onClick={() => {
                  clearSearch()
                  setOpen(false)
                }}
              >
                <FiX className='text-[22px]' />
              </Button>
            </div>
            <div className='flex flex-col gap-[20px] my-[20px] lg:w-full w-[320px] mx-auto'>
              <RenderFolderItem
                title='Folders'
                data={searchFolderData}
                icon={<FiFolder className='text-[20px]' />}
                setOpen={setOpen}
              />
              <RenderNoteItem
                title='Notes'
                data={searchNoteData}
                icon={<FiFileText className='text-[20px]' />}
                setOpen={setOpen}
              />
              <RenderNoteOnMore
                title='Archive'
                data={searchNoteOnArchive}
                redirect='/app/archive'
                icon={<FiFileText className='text-[20px]' />}
                setOpen={setOpen}
              />
              <RenderNoteOnMore
                title='Trash'
                data={searchNoteOnTrash}
                redirect='/app/trash'
                icon={<FiFileText className='text-[20px]' />}
                setOpen={setOpen}
              />
            </div>
            {searchNoteData.length === 0 &&
              searchFolderData.length === 0 &&
              searchNoteOnArchive.length === 0 &&
              searchNoteOnTrash.length === 0 &&
              search && (
                <p className='text-lg flex h-[50%] pt-0 items-center justify-center break-wor ds'>
                  <span>No results for</span>
                  <span className='ml-2 font-bold text-white'>{search}</span>
                </p>
              )}
            {/* If no notes and folder are created below result also seen */}
            {searchNoteData.length === 0 &&
              searchFolderData.length === 0 &&
              searchNoteOnArchive.length === 0 &&
              searchNoteOnTrash.length === 0 &&
              !search && (
                <p className='text-lg flex h-[50%] pt-0 items-center justify-center break-wor ds'>
                  <span>Data is empty</span>
                </p>
              )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SearchNote

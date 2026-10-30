import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Divide } from 'hamburger-react'

import FolderMenu from './folderMenu/folderMenu'
import MoreMenu from './moreMenu'
import LinkMenu from './linkMenu'
import SearchNote from './searchNote'
import CreateNote from './createNote'

import { useGlobalContext } from '../../api/useGlobalContext'

// MAIN AND MOBILE COMMON COMPONENT
export const CoComponent = ({ inside, isSidebarOpen, setIsSidebarOpen }) => {
  const Navigate = useNavigate()
  return (
    <div className='flex flex-col gap-[30px] my-[30px]'>
      <div className='flex justify-between items-center px-[20px]'>
        <div className='relative w-[90px]'>
          <img
            alt='test'
            src='/logo.svg'
            class='object-contain w-full cursor-pointer'
            onClick={() => {
              Navigate('/app')
              if (inside === 'mobile') {
                setIsSidebarOpen(!isSidebarOpen)
              }
            }}
          />
        </div>
        <SearchNote />
      </div>
      <CreateNote />
      <FolderMenu />
      <LinkMenu />
      <MoreMenu />
    </div>
  )
}

// MAIN COMPONENT
const Sidebar = () => {
  return (
    <React.Fragment>
      <div className='lg:block hidden fixed left-0 bottom-0 top-0 w-[300px] custom-scrollbar'>
        <CoComponent inside='sidebar' />
      </div>

      {/* mobile sidebar */}
      <MoSidebar />
    </React.Fragment>
  )
}

// MOBILE SIDEBAR
export const MoSidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(useGlobalContext)
  return (
    <>
      <MoHeader>
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'spring', bounce: 0 }}
                exit={{ opacity: 0 }}
                className='fixed h-screen w-full z-[999] inset-0 bg-black/80'
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              ></motion.div>
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', bounce: 0 }}
                exit={{ x: '-100%' }}
                className='lg:hidden block fixed left-0 bottom-0 top-0 w-[300px] custom-scrollbar z-[999999] bg-background'
              >
                <CoComponent
                  inside='mobile'
                  isSidebarOpen={isSidebarOpen}
                  setIsSidebarOpen={setIsSidebarOpen}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </MoHeader>
    </>
  )
}

// HEADER MOBILE
export const MoHeader = ({ children }) => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(useGlobalContext)
  const Navigate = useNavigate()

  return (
    <div className='lg:hidden block sticky top-0 w-full z-50 bg-background h-[60px]'>
      <div className='flex justify-between items-center relative h-full px-[20px]'>
        <div className={`w-[90px] relative`}>
          <img
            alt='test'
            src={'/logo.svg'}
            className='object-contain w-full'
            onClick={() => Navigate('/app')}
          />
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className='absolute right-0 z-[9999]'
        >
          <Divide toggled={isSidebarOpen} size={20} />
        </button>
      </div>
      {children}
    </div>
  )
}

export default Sidebar

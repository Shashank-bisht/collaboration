import React, { useContext } from 'react'
import NPprogress from 'nprogress'
import { FolderOpen } from 'lucide-react'
import { Button } from '../../components/ui/button'

import { useGlobalContext } from '../../api/useGlobalContext'

const App = () => {
  const { logout } = useContext(useGlobalContext)

  const handleLogoutSubmit = async (e) => {
    e.preventDefault()
    NPprogress.start()

    try {
      await logout()

      setTimeout(() => {
        NPprogress.done()
      }, 1000)
    } catch (err) {
      setTimeout(() => {
        NPprogress.done()
      }, 1000)
    }
  }
  return (
    <>
      <div className='px-4 text-center flex flex-col gap-[10px] items-center justify-center h-[calc(100vh-60px)] w-full lg:h-screen'>
        <FolderOpen className='h-[50px] w-[50px]' />
        <h2 className='font-semibold text-[28px]'>
          Select Folder to view note list
        </h2>
        <p className='lg:w-[460px] text-center font-normal text-white/[60%] text-sm lg:text-base'>
          Choose a folder from the menu on the left to view its notes, or create
          a new folder to add to your collection.
        </p>
        <span>or</span>
        <Button
          className='text-[16px] font-semibold'
          size={'lg'}
          variant={'secondary'}
          onClick={handleLogoutSubmit}
        >
          <span>Logout</span>
        </Button>
      </div>
    </>
  )
}

export default App

import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import NextTopLoader from 'nextjs-toploader'

import { Toaster } from '../components/ui/toaster'
import Sidebar from '../components/sidebar'
import { Animate } from '../components/animate'
import { useGlobalContext } from '../api/useGlobalContext'

export default function RootLayout({ children }) {
  const Navigate = useNavigate()
  const { currentUserId } = useContext(useGlobalContext)

  if (currentUserId === null) {
    setTimeout(() => {
      Navigate('/login') // window.location.href = '/login'
    }, 1)

    return <div></div>
  }

  return (
    <div className='app-page'>
      <NextTopLoader color='#F86F03' />
      <div className='lg:w-[calc(100vw-300px)] lg:ml-auto'>
        <Sidebar />
        <Animate>
          <div className='lg:flex'>{children}</div>
        </Animate>
      </div>
      <Toaster />
    </div>
  )
}

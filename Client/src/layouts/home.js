import React from 'react'
import NextTopLoader from 'nextjs-toploader'

import { Navbar } from '../components/navbar'

export default function HomeLayout({ children }) {
  return (
    <div className='home-page'>
      <Navbar />
      <div className='max-w-[1024px] mx-auto mb-[149px]'>{children}</div>
      <NextTopLoader color='#F86F03' />
    </div>
  )
}

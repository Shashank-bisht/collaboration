import React from 'react'
import { useNavigate } from 'react-router-dom'

function Redirect() {
  const Navigate = useNavigate()
  setTimeout(() => {
    Navigate('/app') // window.location.href = '/app'
  }, 1000)

  return (
    <div className='app-page'>
      <div className='lg:w-[calc(100vw-300px)] lg:ml-auto'>
        <div className='lg:flex'>
          <div className='w-full'>
            <div className='flex justify-center items-center h-screen'>
              <div className='flex flex-col justify-center items-center'>
                <div className='text-3xl '>Redirecting...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Redirect

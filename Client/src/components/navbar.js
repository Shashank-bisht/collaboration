// Both desktop and mobile navbar are in this file

import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Divide } from 'hamburger-react'
import NPprogress from 'nprogress'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../lib/utils'

export const Navbar = () => {
  const Navigate = useNavigate()
  const [blur, setBlur] = React.useState(false)
  const [openNav, setOpenNav] = React.useState(false)

  const navMenus = [
    { label: 'Home', path: '' },
    { label: 'Product', path: '#product' },
    { label: 'Support', path: '#support' },
    { label: 'Contact Us', path: '#contact' },
  ]

  const handleToNextRoute = (route) => {
    NPprogress.start()
    setTimeout(() => {
      Navigate(route)
      NPprogress.done()
    }, 1000)
  }

  const navRef = React.useRef(null)
  const handleBlur = () => {
    if (window.pageYOffset > 60) return setBlur(true)
    return setBlur(false)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleBlur)
    return () => {
      window.removeEventListener('scroll', handleBlur)
    }
  }, [])

  return (
    <>
      <div
        className='absolute w-full 
      h-full top-0 -z-50 select-none pointer-events-none'
      >
        <img
          alt='test'
          fetchpriority='high'
          decoding='async'
          data-nimg='fill'
          className='object-cover w-full'
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: '0',
            top: '0',
            right: '0',
            bottom: '0',
            color: 'transparent',
          }}
          src='/radial-blur-blue.svg'
        />
      </div>
      <div
        className={`lg:block sticky top-0 mt-[58px] w-[1140px] mx-auto z-50 py-[20px] hidden ${
          blur ? 'backdrop-blur-sm bg-background/30' : ''
        }`}
        ref={navRef}
      >
        <div className='flex justify-between items-center'>
          <div className='relative h-[38px] w-[100px]'>
            <img
              alt='test'
              src='/logo.svg'
              className='object-contain w-full cursor-pointer'
              onClick={() => handleToNextRoute('/')}
            />
          </div>
          <div className='flex gap-[50px]'>
            {navMenus.map((item, i) => (
              <NavItem href={item.path} label={item.label} key={i} />
            ))}
          </div>
          <div className='flex gap-[50px]'>
            <Button
              variant={'secondary'}
              size={'lg'}
              className='font-bold'
              onClick={() => handleToNextRoute('/app')}
            >
              Try now
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className={`lg:hidden block sticky top-0 w-full z-50 py-[15px] ${
          blur ? 'backdrop-blur-sm bg-background/30' : ''
        }`}
        ref={navRef}
      >
        <div className='flex justify-between items-center relative'>
          <div className='px-[20px] w-full'>
            <div className='absolute h-full flex items-center z-[999]'>
              <button onClick={() => setOpenNav((prevValue) => !prevValue)}>
                <Divide toggled={openNav} />
              </button>
            </div>
            <div className='flex items-center justify-center w-full relative z-[998]'>
              <img
                alt='test'
                width={100}
                height={38}
                src={'/logo.svg'}
                onClick={() => handleToNextRoute('/')}
              />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {openNav && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='absolute z-[99] inset-0'
              >
                <div className='bg-black/40 w-full h-screen'></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: '-100%' }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { type: 'spring', bounce: 0 },
                }}
                exit={{
                  x: '-100%',
                  transition: { delay: 0.1, type: 'spring', bounce: 0 },
                }}
                className='fixed z-[99] top-0 left-0 bg-zinc-900 overflow-hidden w-[80%]'
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.5 } }}
                  transition={{ type: 'spring', bounce: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className='h-screen mt-[70px] px-[20px]'>
                    <div className='flex flex-col gap-[20px]'>
                      {navMenus.map((item, i) => (
                        <NavItem
                          href={item.path}
                          label={item.label}
                          key={i}
                          className='text-2xl'
                        />
                      ))}
                    </div>
                    <div className='flex gap-[50px] mt-5'>
                      <Button
                        variant={'default'}
                        size={'lg'}
                        className='font-bold w-full text-md'
                        onClick={() => handleToNextRoute('/app')}
                      >
                        Try now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

const NavItem = ({ href, label, className, ...props }) => {
  href = href.toLowerCase()
  const hash = window.location.hash.toLowerCase()

  const condition = window.location.pathname === '/' ? href === hash : false
  return (
    <>
      <Link
        to={'/' + href}
        className={cn(
          `${
            condition ? 'text-white font-medium' : 'inactive-text font-normal'
          } hover:text-white transition-all`,
          className
        )}
        {...props}
      >
        {label}
      </Link>
    </>
  )
}

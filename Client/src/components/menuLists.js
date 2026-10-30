import React, { useContext } from 'react'
import { useMediaQuery } from 'react-responsive'

import { motion } from 'framer-motion'
import { useGlobalContext } from '../api/useGlobalContext'

const MenuLists = ({ children, title }) => {
  const isBigScreen = useMediaQuery({ minWidth: 1024 })
  const { activeBlock, isActiveNote } = useContext(useGlobalContext)

  if (!isBigScreen) {
    return (
      <>
        {activeBlock ? ( // important checkpoint for mobile
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0 }}
            exit={{ opacity: 0 }}
          >
            {!isActiveNote ? ( // important checkpoint for mobile
              <div className='overflow-y-auto lg:w-[350px] lg:h-screen h-[calc(100vh-60px)] bg-acent-2 px-5 pb-[23px]'>
                <div className='sticky top-0 h-24 flex items-center bg-acent-2 z-[10]'>
                  <div className='font-semibold max-w-full text-[22px]'>
                    {title}
                  </div>
                </div>
                {children}
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </>
    )
  }

  return (
    <div className='overflow-y-auto w-[350px] h-screen bg-acent-2 px-5 pb-[23px]'>
      <div className='sticky top-0 h-24 flex items-center bg-acent-2'>
        <div className='font-semibold max-w-full text-[22px]'>{title}</div>
      </div>
      {children}
    </div>
  )
}

export default MenuLists

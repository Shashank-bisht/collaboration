import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiBookmark, FiLink, FiUsers } from 'react-icons/fi'
import IndicatorCount from '../ui/indicatorCount'
import { useGlobalContext } from '../../api/useGlobalContext'

const LinkMenu = () => {
  const {
    bookmarks,
    shares,
    sharedWithMe,
    setIsSidebarOpen,
    setIsActiveNote,
    setActiveBlock,
  } = useContext(useGlobalContext)

  const link = [
    {
      name: 'Bookmark',
      href: '/bookmark',
      icon: <FiBookmark />,
      counter: bookmarks?.length,
      active: 'bookmark',
    },
    {
      name: 'Shared',
      href: '/shared',
      icon: <FiLink />,
      counter: shares?.length,
      active: 'shared',
    },
    {
      name: 'Shared with me',
      href: '/shared-with-me',
      icon: <FiUsers />,
      counter: sharedWithMe?.length,
      active: 'sharedWithMe',
    },
  ]
  return (
    <div className='flex flex-col space-y-[8px]'>
      <div className='flex justify-between items-center px-[30px] inactive-text'>
        <p className='text-[14px] font-semibold'>Link</p>
      </div>
      <div className='flex flex-col gap-[5px]'>
        {link.map((item, i) => (
          <React.Fragment key={i}>
            <Link
              className='inactive-text hover:text-white py-[10px] hover:bg-white/[3%] transition px-[30px] rounded-md'
              to={'/app' + item.href}
              onClick={() => {
                setActiveBlock(item.active)
                setIsActiveNote(false)
                setIsSidebarOpen(false)
              }}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-[15px]'>
                  <div className='text-[20px]'>{item.icon}</div>
                  <p className='truncate'>{item.name}</p>
                </div>
                <IndicatorCount className='mr-2' count={item.counter} />
              </div>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default LinkMenu

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiStar, FiArchive, FiTrash } from 'react-icons/fi'
import IndicatorCount from '../ui/indicatorCount'
import { useGlobalContext } from '../../api/useGlobalContext'

const MoreMenu = () => {
  const {
    setIsSidebarOpen,
    setIsActiveNote,
    favorites,
    trash,
    archive,
    setActiveBlock,
  } = useContext(useGlobalContext)

  const more = [
    {
      name: 'Favorites',
      href: '/favorites',
      icon: <FiStar />,
      counter: favorites?.length,
      active: 'favorites',
    },
    {
      name: 'Archive',
      href: '/archive',
      icon: <FiArchive />,
      counter: archive?.length,
      active: 'archive',
    },
    {
      name: 'Trash',
      href: '/trash',
      icon: <FiTrash />,
      counter: trash?.length,
      active: 'trash',
    },
  ]
  return (
    <div className='flex flex-col space-y-[8px]'>
      <div className='flex justify-between items-center px-[30px] inactive-text'>
        <p className='text-[14px] font-semibold'>More</p>
      </div>
      <div className='flex flex-col gap-[5px]'>
        {more.map((item, i) => (
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

export default MoreMenu

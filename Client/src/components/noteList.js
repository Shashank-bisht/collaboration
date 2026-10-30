import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FiInfo } from 'react-icons/fi'
import { dateToString, toPlainText } from '../lib/utils'
import { Card, CardContent } from './ui/card'
import MenuLists from './menuLists'

function NoteList({
  icon,
  title,
  array,
  note,
  setNote,
  isActiveNote,
  setIsActiveNote,
  activeBlock,
}) {
  return (
    <MenuLists
      title={
        // max-w-full
        <div className='flex items-center'>
          {icon}
          <p className='truncate'>{title}</p>
        </div>
      }
    >
      {array?.map((item, i) => (
        <Card
          className={`bg-white/[3%] border-none hover:bg-white/[7%] transition cursor-pointer mb-5 last-of-type:mb-0 ${
            isActiveNote && item.note_id === note?.note_id
              ? 'bg-white/[7%] text-white'
              : 'text-white/[40%]'
          }`}
          key={i}
          onClick={() => {
            setIsActiveNote(true)
            setNote(item)
          }}
        >
          <CardContent className='p-[20px]'>
            <h2 className='line-clamp-2 text-[18px] font-semibold leading-7'>
              {item.name}{' '}
              {activeBlock === 'shared' &&
              (item.deleted === 1 || item.archive === 1) ? (
                <span className='ms-1 px-2 bg-pink-700 hover:bg-pink-800 text-white rounded-full'>
                  {item.deleted === 1 ? 'trash' : 'archive'}
                </span>
              ) : null}
            </h2>
            <div className='flex inactive-text mt-[10px] items-center max-w-full'>
              {activeBlock === 'folder' ? (
                item.favorite === 1 ? (
                  <AiFillStar className='text-yellow-500 text-sm mr-1' />
                ) : (
                  <AiOutlineStar className='text-white text-sm mr-1' />
                )
              ) : null}
              <p className='font-normal mr-[10px]'>
                {dateToString({ values: item.created_date })}
              </p>
              <p className='truncate font-normal flex-1'>
                {toPlainText({ value: item.content, type: 'html' })}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      {array?.length === 0 ? (
        <div className='h-[70vh] flex items-center justify-center flex-col gap-2'>
          <FiInfo className='text-[24px] inactive-text' />
          <p className='inactive-text text-[20px]'>
            {(title || 'Folder') + ' is empty'}
          </p>
        </div>
      ) : null}
    </MenuLists>
  )
}

export default NoteList

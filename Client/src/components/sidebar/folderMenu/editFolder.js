import React from 'react'
import { LuFolder } from 'react-icons/lu'
import { useFolderState } from './store'

function UpdateFolder() {
  const { isEditFolder, updateData, setUpdateData } = useFolderState()

  return (
    <>
      {isEditFolder ? (
        <div className='flex items-center gap-[15px] w-[80%] h-full py-[10px] pr-[20px]'>
          <div>
            <LuFolder className='text-[20px]' />
          </div>
          <div className='relative'>
            <input
              name='folderName'
              type='text'
              autoFocus
              defaultValue={updateData.name}
              onChange={(e) => {
                setUpdateData({
                  name: e.target.value,
                  folder_id: updateData.folder_id,
                })
              }}
              className={`bg-transparent outline outline-white/[5%] rounded w-auto ${
                updateData.name === '' && 'border border-red-500'
              }`}
            />
            <div
              className={`absolute transition-opacity ${
                false
                  ? 'inset-0 -translate-y-6 text-[14px] text-red-500 opacity-100'
                  : 'opacity-0'
              }`}
            >
              {false && <p>something went wrong</p>}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default UpdateFolder

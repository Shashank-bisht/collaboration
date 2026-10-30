import React from 'react'
import Dvider from '../../ui/dvider'
import ParagraphMenu from './menu/paragraphMenu'
import ToggleMenus from './menu/toggleMenus'
import UploadMenu from './menu/uploadMenu'
import LinkMenu from './menu/linkMenu'
import LockMenus from './menu/lockMenu'

function EditorToolbar({ editor, isEditable }) {
  if (!editor) {
    return
  }
  return (
    <div className='flex flex-col gap-[10px] mb-[10px]'>
      {isEditable ? (
        <>
          <Dvider />
          <div className='flex justify-between lg:justify-space-between'>
            <div className='flex lg:gap-[30px] items-center justify-between lg:justify-start'>
              <ParagraphMenu editor={editor} />
              <ToggleMenus editor={editor} />
              <div className='flex gap-[5px] items-center'>
                <UploadMenu editor={editor} />
                <LinkMenu editor={editor} />
              </div>
            </div>
          </div>
        </>
      ) : null}
      <Dvider />
      <div className='flex-end gap-[5px] items-center'>
        <LockMenus editor={editor} />
      </div>
      <Dvider />
    </div>
  )
}

export default EditorToolbar

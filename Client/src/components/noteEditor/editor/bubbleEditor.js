import { BubbleMenu } from '@tiptap/react'
import React from 'react'
import ToggleMenus from './menu/toggleMenus'
import LinkMenu from './menu/linkMenu'

function BubbleEditor({ editor }) {
  if (!editor) return null
  return (
    <div>
      <BubbleMenu
        editor={editor}
        className='bg-acent-2/75 backdrop-blur-sm flex gap-2 rounded-sm'
      >
        <ToggleMenus editor={editor} />
        <LinkMenu editor={editor} />
      </BubbleMenu>
    </div>
  )
}

export default BubbleEditor

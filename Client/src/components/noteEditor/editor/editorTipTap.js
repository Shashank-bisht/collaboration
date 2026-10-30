'use client'
import { EditorContent } from '@tiptap/react'
import './editor.css'

export const EditorTipTap = ({ editor }) => {
  if (!editor) return null
  return (
    <>
      <EditorContent editor={editor} />
    </>
  )
}

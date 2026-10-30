import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useState, useEffect, useContext, useRef } from 'react'
import { useGlobalContext } from '../../../api/useGlobalContext'

function useNoteEditor({ onEdit } = {}) {
  const { note, isEditable } = useContext(useGlobalContext)
  const [_content, setContent] = useState(note?.content || '')
  const onEditRef = useRef(onEdit)
  onEditRef.current = onEdit

  let editor = useEditor({
    content: _content,
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'paragraph',
          },
        },
        heading: {
          HTMLAttributes: {
            class: 'heading-text',
          },
        },
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'image-editor',
        },
        allowBase64: true,
        inline: true,
      }),
      Placeholder.configure({
        emptyNodeClass: 'is-editor-empty',
        placeholder: 'Write here what you want.....',
        showOnlyCurrent: true,
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'link-custom',
        },
        autolink: false,
        linkOnPaste: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'oultine-none min-h-[300px] mt-[30px] mb-[75px] px-2 border-none outline-none ring-0 prose prose-invert max-w-full',
        spellcheck: 'false',
      },
    },
    onUpdate: () => {
      onEditRef.current?.()
      // on every update, cursor set to end of the document, on delete one character, cursor set to end of the document. this is problamatic if we set content here
    },
    autofocus: true,
    editable: isEditable,
    injectCSS: false,
  })

  // update content when note changes
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(note?.content, false)
    }
    setContent(note?.content)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note])

  useEffect(() => {
    editor?.setEditable(isEditable)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditable])

  return editor
}

export default useNoteEditor

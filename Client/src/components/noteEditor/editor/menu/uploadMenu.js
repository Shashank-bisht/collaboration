import React, { useRef, useState, useContext } from 'react'
import Dvider from '../../../ui/dvider'
import { Button } from '../../../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '../../../ui/dialog'
import { FiImage } from 'react-icons/fi'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { useToast } from '../../../ui/use-toast'
import { useGlobalContext } from '../../../../api/useGlobalContext'
import { xUpdateNote, xUploadImg } from '../../../../api/fetch'

function UploadMenu({ editor }) {
  const { note, setNote, setOnSave } = useContext(useGlobalContext)

  const { toast } = useToast()
  const uploadRef = useRef(null)
  const [urlLink, setUrlLink] = useState('')
  let image = {
    source: null,
  }

  let [openDialog, setOpenDialog] = useState(false)

  if (!editor) return

  const upload = async () => {
    try {
      if (!image.source) return null
      const formData = new FormData()
      formData.append('file', image.source)
      return await xUploadImg(formData)
    } catch (err) {
      return null
    }
  }

  const addHttpIfNotExists = (urlLink) => {
    if (!/^https?:\/\//i.test(urlLink)) {
      return `https://${urlLink}`
    } else {
      return urlLink
    }
  }

  const handleUploadImages = async (e) => {
    e.preventDefault()
    const imgUrl = await upload()

    if (imgUrl || (urlLink !== '' && urlLink !== 'https://')) {
      editor
        ?.chain()
        .focus()
        .setImage({
          src: imgUrl ? `/img/${imgUrl}` : urlLink,
          alt: 'Image',
        })
        .run()

      Image.source = null

      // save note
      // it is very important to save note after image upload because image upload will change the content of the note and we can track change images change
      // what we mean: what happen if user upload 6 images one by one and remove 1 of them and save note. 6 image uploaded already when user selected. 5 images can be track in the note. but we can not know which image is removed or we can say we can't track removed img for deleting from backend storage. that's why we need to save note after image upload. on every save note we can track which image is removed and delete from backend storage.

      __saveNote()

      toast({
        title: 'Success',
        description: 'Image uploaded.',
        variant: 'success',
      })
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'danger',
      })
    }

    setOpenDialog(!openDialog)
  }

  const __saveNote = async () => {
    setOnSave(true)
    try {
      const result = await xUpdateNote(note?.note_id, {
        name: note?.name,
        content: editor.getHTML(),
        version: note?.version,
      })
      setNote({
        ...note,
        content: editor.getHTML(),
        version: result.version,
      })
      // if (_?.status === 200) {
      //   getNotes()
      // }
    } catch (err) {
      toast({
        title:
          err.response?.status === 409
            ? 'Note changed by another user'
            : 'Error',
        description:
          err.response?.data?.message ||
          err.response?.data ||
          'Something went wrong on save. Your draft is still in the editor.',
        variant: 'danger',
      })
    }
    setOnSave(false)
  }

  return (
    <>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <h2 className='text-2xl font-semibold'>Add Image!</h2>
            <Dvider />
          </DialogHeader>

          <p className='my-1'>
            <p className='mb-2'>Image url</p>
            <input
              className='w-full px-3 py-2 bg-[#1c1917] text-white border rounded-md border-[#a3a3a3] focus:outline focus:border-[#f472b6]'
              type='text'
              placeholder='https://example.com/image.png'
              value={urlLink}
              onChange={(e) => setUrlLink(addHttpIfNotExists(e.target.value))}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleUploadImages(e)
                }
              }}
            />
          </p>

          <p className='mt-1'>
            <span className='me-4'>Or, choose an Image</span>
            <input
              type='file'
              className='invisible absolute pointer-events-none'
              ref={uploadRef}
              onChange={(e) => {
                if (e.target.files) {
                  image.source = e.target.files[0]
                  handleUploadImages(e)
                }
              }}
            />
            <Button
              className='p-[7px] bg-gray text-white border rounded-md border-gray-700 focus:outline-none focus:border-[#f472b6]'
              size={'sm'}
              variant={'ghost'}
              onClick={() => {
                if (uploadRef.current) {
                  uploadRef.current.click()
                  toast({
                    title: 'Informaton',
                    description: `Large images can impact editor performance. Recommended size: 40KB or less.`,
                    variant: 'success',
                  })
                }
              }}
            >
              <span>Upload </span> &nbsp;
              <AiOutlineCloudUpload className='text-[20px]' />
            </Button>
          </p>

          <DialogFooter>
            <Button
              className='m-1'
              onClick={() => setOpenDialog(!openDialog)}
              size={'sm'}
              variant={'secondary'}
            >
              Cancel
            </Button>
            <Button
              className='m-1'
              onClick={(e) => {
                handleUploadImages(e)
              }}
              size={'sm'}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button
        className='p-[7px]'
        size={'sm'}
        variant={'ghost'}
        onClick={() => setOpenDialog(!openDialog)}
      >
        <FiImage className='lg:text-[20px] text-[18px] text-neutral-400' />
        {/* <span className='relative left-0 top-2 text-xs'>&lt; 40KB</span> */}
      </Button>
    </>
  )
}

export default UploadMenu

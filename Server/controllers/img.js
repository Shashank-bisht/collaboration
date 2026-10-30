import multer from 'multer'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
// import axios from 'axios'

const __dirname = dirname(fileURLToPath(import.meta.url))

const absoluteImagePath = (filename) => {
  return path.join(__dirname, '..', 'upload', filename)
}

const downloadErrorGif = async (errorGifPath) => {
  // try {
  //   const response = await axios.get(
  //     'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzNlYzBtdWljd2wwdjNmZjh0bG9tYTh3aXoycDhtOG1kaHlhcm5vMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3zhxq2ttgN6rEw8SDx/giphy.gif',
  //     {
  //       responseType: 'arraybuffer',
  //     }
  //   )
  //   fs.writeFileSync(errorGifPath, response.data)
  //   console.log('Error GIF image downloaded and saved successfully.')
  // } catch (error) {
  //   console.error('Error downloading or saving the error GIF image:', error)
  // }
}

/*  -------------------------------------------------------
 * [GetImg] - Main Start
 *  ------------------------------------------------------- */
export const getImg = (req, res) => {
  // Construct the absolute path to the image file based on the filename parameter
  const filename = req.params.filename
  const ImagePath = absoluteImagePath(filename)

  // Serve the image using the res.sendFile method
  res.sendFile(ImagePath, (err) => {
    if (err) {
      // Construct the absolute path to the error GIF file
      const errorGifPath = path.join(__dirname, '..', 'upload', 'error.gif') // Adjust the path as needed

      // if errorGifPath not found, then download from internet and save it to the upload folder with 'error.gif' name and then use it

      if (!fs.existsSync(errorGifPath)) {
        downloadErrorGif(errorGifPath)
      }

      // Send the GIF image as a response with a 404 status
      res.status(404).sendFile(errorGifPath, (err) => {
        if (err) {
          console.error('Error sending GIF image:', err)
          res.status(500).send('Internal Server Error')
        }
      })
    }
  })
}
/*  -------------------------------------------------------
 * [GetImg] - Main End
 *  ------------------------------------------------------- */

const replaceSpecialCharactersWithUnderscore = (inputString) => {
  // Use a regular expression to replace all special characters with '_'
  return inputString.replace(/[^a-zA-Z0-9]/g, '_')
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    const filenameArray = file.originalname.split('.')
    cb(
      null,
      Date.now() +
        replaceSpecialCharactersWithUnderscore(
          filenameArray.slice(0, filenameArray.length - 1).join('')
        ) +
        '.' +
        filenameArray[filenameArray.length - 1]
    )
  },
})

/*  -------------------------------------------------------
 * [SaveFile, AddImg] - Main Start
 *  ------------------------------------------------------- */
export const saveFile = multer({ storage }).single('file')

export const addImg = (req, res) => {
  if (req.file === undefined) return res.status(200).json(null)

  const filenameArray = req.file.filename.split('.')

  const filename =
    replaceSpecialCharactersWithUnderscore(
      filenameArray.slice(0, filenameArray.length - 1).join('')
    ) +
    '.' +
    filenameArray[filenameArray.length - 1]

  console.log('File added: ' + filename)
  res.status(200).json(filename)
}
/*  -------------------------------------------------------
 * [SaveFile, AddImg] - Main End
 *  ------------------------------------------------------- */

const deleteImg = (filename) => {
  if (filename === null || filename === undefined) return

  // Construct the absolute path to the image file based on the filename parameter
  const ImagePath = absoluteImagePath(filename)

  // Check if the file exists before attempting to delete it
  if (fs.existsSync(ImagePath)) {
    // Delete the file
    fs.unlink(ImagePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err)
      } else {
        console.log('File deleted: ', filename)
      }
    })
  } else {
    console.error('File does not exist.')
  }
}

export const checkAndDeleteImg = (oldcontent, newContent) => {
  // get array of img src from old content
  const regex = /<img[^>]+src="([^">]+)"/g
  const oldImgs = []
  let match
  while ((match = regex.exec(oldcontent))) {
    oldImgs.push(match[1])
  }

  // get array of img src from new content
  const newImgs = []
  while ((match = regex.exec(newContent))) {
    newImgs.push(match[1])
  }

  // get array of img src that need to be deleted
  const imgsToDelete = oldImgs.filter((img) => !newImgs.includes(img))

  // remove img element from imgsToDelete array that contains 'http://' or 'https://'
  const imgsToDelete2 = imgsToDelete.filter(
    (img) => !img.includes('http://') && !img.includes('https://')
  )

  // delete img from server using filename
  imgsToDelete2.forEach((img) => {
    deleteImg(img.split('/')[img.split('/').length - 1])
  })
}

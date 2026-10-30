# Note-Taking Web App Backend Guide

This guide provides a concise overview of setting up the backend for a note-taking web application. It covers the essential steps and considerations for developers looking to build a robust backend.

## Setting Up the Express Server

**1. Create a Server Directory**

Start by creating a new directory for project server.

```bash
mkdir server
```

**2. Initialize a Node.js Project**

Navigate into the server directory and initialize a new Node.js project.

```bash
cd server
npm init -y
```

**3. Install Dependencies**

Install the necessary packages for your project.

```bash
npm install express bcryptjs cookie-parser cors dotenv jsonwebtoken multer mysql2 nodemon uuid
```

**4. Update `package.json` Scripts**

Add scripts for development and production environments.

```
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

**5. Environment Variables**

Create a `.env` file to store environment variables.

```python
NODE_ENV=development #production
PORT=9000
X_CLIENT_URL=* #http://localhost:3000

DB_HOST=localhost #writer.crxbzf8ajipn.us-east-1.rds.amazonaws.com
DB_USER=root #admin
DB_KEY=root #ptqw0eLsXlbjkLME8tVZfw
DB_NAME=writer

SALT_KEY=10
JWT_SECRET=secret-key
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIR_IN=7 # expire in 7 days
```

**6. Create Necessary Folders**

Organize your project by creating directories for controllers, public assets, routes, and uploads

```bash
mkdir controllers
mkdir public
mkdir routes
mkdir upload
```

## Database Setup

Ensure you have a database schema that includes tables for users, notes, folders, bookmarks, and shares. Define relationships between these tables as necessary.

`charset:` utf8mb4  
`collation:` utf8mb4_0900_ai_ci

**Schema Query**

```bash
DROP DATABASE IF EXISTS writer;
CREATE DATABASE writer;
USE writer;

CREATE TABLE users (
    user_id VARCHAR(45) PRIMARY KEY NOT NULL,
    username VARCHAR(45) UNIQUE NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE folders (
    folder_id VARCHAR(45) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(45) NOT NULL,
    CONSTRAINT f_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE notes (
    note_id VARCHAR(45) PRIMARY KEY NOT NULL,
    name VARCHAR(255) DEFAULT NULL,
    content TEXT DEFAULT NULL,
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT false,
    favorite BOOLEAN DEFAULT false,
    archive BOOLEAN DEFAULT false,
    folder_id VARCHAR(45) NOT NULL,
    CONSTRAINT n_folder_id FOREIGN KEY (folder_id) REFERENCES folders(folder_id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id VARCHAR(45) NOT NULL,
    CONSTRAINT n_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE shares (
    share_id VARCHAR(45) PRIMARY KEY NOT NULL,
    note_id VARCHAR(45) UNIQUE NOT NULL,
    CONSTRAINT s_note_id FOREIGN KEY (note_id) REFERENCES notes(note_id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id VARCHAR(45) NOT NULL,
    CONSTRAINT s_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE bookmarks (
    bookmark_id VARCHAR(45) PRIMARY KEY NOT NULL,
    share_id VARCHAR(45) NOT NULL,
    CONSTRAINT b_share_id FOREIGN KEY (share_id) REFERENCES shares(share_id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id VARCHAR(45) NOT NULL,
    CONSTRAINT b_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

## Top Level Files

### ./db.js

```javascript
import dotenv from 'dotenv'
import mysql2 from 'mysql2'

dotenv.config()

export const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_KEY,
  database: process.env.DB_NAME,
})
```

### ./index.js

```javascript
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.js'
import imgRoutes from './routes/img.js'
import userRoutes from './routes/users.js'
import folderRoutes from './routes/folders.js'
import noteRoutes from './routes/notes.js'
import sharedRoutes from './routes/share.js'
import bookmarkRoutes from './routes/bookmark.js'
import { db } from './db.js'

dotenv.config()
const app = express()

app.use(cookieParser())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

const corsOptions = {
  credentials: true, // Allow credentials (cookies) to be sent with requests for auth in each request
  methods: 'GET,POST,PUT,DELETE,PATCH,HEAD,OPTIONS', // Define allowed HTTP methods

  // Define a function to dynamically determine allowed CORS origin
  origin: function (origin, callback) {
    // Check if the request origin matches the whitelist or is null (e.g., for requests from file://)
    // if process.env.X_CLIENT_URL === '*' it means that the server will accept requests from any origin (e.g., for requests from file://) or from any domain
    // or if process.env.X_CLIENT_URL === origin it means that the server will accept requests from the specified origin only
    if (
      process.env.X_CLIENT_URL === '*' ||
      !origin ||
      process.env.X_CLIENT_URL === origin
    ) {
      callback(null, true) // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')) // Deny the request
    }
  },
}
app.use(cors(corsOptions))

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.use(express.static('public/build'))
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// CLIENT ROUTES
const clientResponse = (req, res, next) => {
  let filePath = path.join(__dirname, 'public', 'build', 'index.html')
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath)
  } else {
    res.send(
      "<span style='font-size:4rem;'><em>I'm sorry, but the page you were looking for does not exist.</em></span>"
    )
  }
}
const routes = ['/', '/login', '/register', '/app', '/app/*']
routes.forEach((route) => {
  app.get(route, clientResponse)
})

// SERVER ROUTES
app.use('/img', imgRoutes) // special route in server
app.get('/api/test', (req, res) => {
  const q = `SELECT favorite FROM notes`

  db.query(q, (err, data) => {
    return res.status(200).json(data)
  })
})
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/folders', folderRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/shares', sharedRoutes)
app.use('/api/bookmarks', bookmarkRoutes)

// Error handling
if (process.env.NODE_ENV !== 'development') {
  app.use((req, res, next) => {
    const error = new Error('Not found!')
    error.status = 404
    next(error)
  })
  app.use((error, req, res, next) => {
    console.log(error)
    res.status(error.status || 500)
    res.json('something broke!')
  })
} else {
  app.use('*', clientResponse)
}

app.listen(process.env.PORT || 9000, () => {
  console.log('Connected!')
})
```

## Routes Files

### routes/auth.js

```javascript
import express from 'express'
import { verify, register, login, logout } from '../controllers/auth.js'

const router = express.Router()

router.post('/', verify)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

export default router
```

### routes/bookmarks.js

```javascript
import express from 'express'
import {
  getBookmarks,
  getBookmark,
  addBookmark,
  deleteBookmark,
} from '../controllers/bookmarks.js'

const router = express.Router()

router.get('/', getBookmarks)
router.get('/:id', getBookmark)
router.post('/', addBookmark)
router.delete('/:id', deleteBookmark)

export default router
```

### routes/folder.js

```javascript
import express from 'express'
import {
  getFolders,
  getFolder,
  addFolder,
  deleteFolder,
  updateFolder,
} from '../controllers/folder.js'

const router = express.Router()

router.get('/', getFolders)
router.get('/:id', getFolder)
router.post('/', addFolder)
router.delete('/:id', deleteFolder)
router.put('/:id', updateFolder)

export default router
```

### routes/img.js

```javascript
import express from 'express'
import { saveFile, addImg, getImg } from '../controllers/img.js'

const router = express.Router()

router.get('/:filename', getImg)
router.post('/', saveFile, addImg)

export default router
```

### routes/notes.js

```javascript
import express from 'express'
import {
  getNotes,
  getNote,
  addNote,
  updateNote,
  deleteNote,
} from '../controllers/notes.js'

const router = express.Router()

router.get('/', getNotes)
router.get('/:id', getNote)
router.post('/', addNote)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

export default router
```

### routes/shares.js

```javascript
import express from 'express'
import {
  getShares,
  getShare,
  addShare,
  deleteShare,
} from '../controllers/shares.js'

const router = express.Router()

router.get('/', getShares)
router.get('/:id', getShare)
router.post('/', addShare)
router.delete('/:id', deleteShare)

export default router
```

### routes/users.js

```javascript
import express from 'express'
import { updateUser } from '../controllers/user.js'

const router = express.Router()

router.put('/', updateUser)

export default router
```

## Controllers Files

### controllers/auth.js

```javascript
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'

dotenv.config()
const { NODE_ENV, SALT_KEY, JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_EXPIR_IN } =
  process.env

export const verify = (req, res) => {
  const token = req.cookies?.access_token

  if (!token) return res.json({ msg: 'Not authenticated', status: 401 })

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.json({ msg: 'Token is not valid!', status: 403 })

    return res.json({
      user_id: userInfo.user_id,
      msg: 'Succesfully authenticated!',
      status: 200,
    })
  })
}

export const register = (req, res) => {
  //CHECK EXISTING USER
  const q = 'SELECT * FROM users WHERE email = ? OR username = ?'

  req.body.email = req.body.email.toLowerCase()
  req.body.username = req.body.username.toLowerCase()

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json('Internal server error!')

    if (data.length) return res.status(409).json('User already exists!')

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(Number(SALT_KEY))
    const hash = bcrypt.hashSync(req.body.password, salt)

    const q =
      'INSERT INTO users(`user_id`,`username`,`email`,`password`) VALUES (?)'
    const values = [uuidv4(), req.body.username, req.body.email, hash]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json('Internal server error!')

      return res.status(200).json('Succesfully registered!')
    })
  })
}

export const login = (req, res) => {
  //CHECK USER

  const q = 'SELECT * FROM users WHERE email = ? OR username = ?'

  req.body.user = req.body?.user?.toLowerCase()

  if (!req.body.user || !req.body.password)
    return res.status(400).json('Wrong username/email or password!')

  db.query(q, [req.body.user, req.body.user], (err, data) => {
    if (err) return res.status(500).json('Internal server error!')
    if (data.length === 0) return res.status(404).json('User not found!')

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    )

    if (!isPasswordCorrect)
      return res.status(400).json('Wrong username/email or password!')

    const token = jwt.sign({ user_id: data[0].user_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })
    const { password, ...other } = data[0]

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(
        new Date().setDate(new Date().getDate() + Number(JWT_COOKIE_EXPIR_IN))
      ),
    }
    // if (NODE_ENV === 'production') cookieOptions.secure = true

    res
      .cookie('access_token', token, cookieOptions)
      .status(200)
      .json({ ...other, msg: 'Succesfully logged in!' })
  })
}

export const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.')
}
```

### controllers/bookmarks.js

```javascript
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'

import dotenv from 'dotenv'

dotenv.config()
const { JWT_SECRET } = process.env

// note: share_id in bookmarks table can not be unique because one shared note can be bookmarked by multiple users
export const getBookmarks = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    // get all bookmarks and shared, notes except favorite, folder_name, archive details where shares share_id = bookmarks share_id and  shares note_id = notes note_id and shares user_id = user_id and notes deteled = 0

    // note: n.user_id and s.user_id will always same
    const q = `SELECT
                    b.bookmark_id,
                    s.share_id,
                    n.note_id,
                    n.name,
                    n.content,
                    n.created_date,
                    n.deleted,
                    n.user_id
                FROM
                    bookmarks AS b
                JOIN
                    shares AS s
                ON
                    b.share_id = s.share_id
                JOIN
                    notes AS n
                ON
                    s.note_id = n.note_id
                WHERE
                    n.deleted = 0
                AND
                    b.user_id = ?
                ORDER BY
                    n.created_date DESC
                    `
    db.query(q, [userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json('You can view only your notes!')

      return res.status(200).json(data)
    })
  })
}

// useless function for now but may be useful in future so keeping it here for now :)
export const getBookmark = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q =
      'SELECT b.bookmark_id, n.note_id, s.share_id, n.name, n.content, n.created_date, n.deleted, n.user_id FROM bookmarks b JOIN shares s ON b.share_id = s.share_id JOIN notes n ON s.note_id = n.note_id WHERE n.deleted = 0 AND b.bookmark_id = ? AND b.user_id = ?'

    db.query(q, [req.params.id, userInfo.user_id], (err, data) => {
      if (err || data.length === 0)
        return res.status(403).json('No bookmark found!')

      return res.status(200).json(data[0])
    })
  })
}

export const addBookmark = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const _q = 'SELECT * FROM bookmarks WHERE `share_id` = ? AND `user_id` = ?'
    const q =
      'INSERT INTO bookmarks(`bookmark_id`, `share_id`,`user_id`) VALUES (?, ?, ?)'

    const id = uuidv4()
    const values = [req.body.share_id, userInfo.user_id]

    // check if the share_id is already shared or not for current user if not then add it to shared table and return the shared id

    db.query(_q, values, (_err, _data) => {
      if (_err) {
        return res.status(500).json(_err)
      }

      if (_data.length > 0) {
        return res.json({
          msg: 'Note is already bookmark.',
          bookmark_id: _data[0].bookmark_id,
        })
      } else {
        db.query(q, [id, ...values], (err, data) => {
          if (err) {
            return res.status(500).json(err)
          }

          console.log('Bookmark has been created.')
          return res.json({
            msg: 'Bookmark has been created.',
            bookmark_id: id,
          })
        })
      }
    })
  })
}

export const deleteBookmark = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const bookmark_id = req.params.id
    const q = 'DELETE FROM bookmarks WHERE `bookmark_id` = ? AND `user_id` = ?'

    db.query(q, [bookmark_id, userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json('You can delete only your bookmark!')

      return res.json('bookmark has been deleted!')
    })
  })
}
```

### controllers/folder.js

```javascript
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'
import { checkAndDeleteImg } from './img.js'
import dotenv from 'dotenv'

dotenv.config()
const { JWT_SECRET } = process.env

export const getFolders = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = 'SELECT folder_id, name FROM folders WHERE `user_id` = ?'

    db.query(q, [userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json('Something went wrong!')

      return res.status(200).json(data)
    })
  })
}

// usless function
export const getFolder = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')
    const q =
      'SELECT folder_id, name, created_date FROM folders WHERE `folder_id` = ? AND user_id = ?'

    db.query(q, [req.params.id, userInfo.user_id], (err, data) => {
      if (err || data.length === 0)
        return res.status(403).json('You can get only your folders!')

      return res.status(200).json(data[0])
    })
  })
}

export const addFolder = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = 'INSERT INTO folders(`folder_id`,`name`, `user_id`) VALUES (?)'
    const folderId = uuidv4() // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

    const values = [folderId, req.body.name, userInfo.user_id]

    if (req.body.name === '') return res.status(403).json('Name is required!')

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json('Internal server error')

      return res
        .status(200)
        .json({ msg: 'Succesfully created.', folder_id: folderId })
    })
  })
}

export const deleteFolder = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const folderId = req.params.id
    const q = 'DELETE FROM folders WHERE `folder_id` = ? AND `user_id` = ?'

    // get content from all notes from folder
    const qNotes = 'SELECT note_id, content FROM notes WHERE folder_id = ?'
    const oldcontent = []

    db.query(qNotes, [folderId], (_err, _data) => {
      if (_err) return res.status(500).json('Internal server error')

      _data.forEach((note) => {
        let cur = note.content
        oldcontent.push(cur ? cur : '')
      })

      // delete notes from folder
      db.query(q, [folderId, userInfo.user_id], (err, data) => {
        if (err)
          return res.status(403).json('Something went wrong! Try again later.')

        try {
          // delete images from folder
          oldcontent.forEach((content) => {
            checkAndDeleteImg(content, '')
          })
        } catch (err) {
          return res.status(500).json('Internal server error')
        }

        return res.status(200).json({ msg: 'Succesfully deleted.' })
      })
    })
  })
}

export const updateFolder = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const folderId = req.params.id
    const q =
      'UPDATE folders SET `name`=? WHERE `folder_id` = ? AND `user_id` = ?'

    db.query(q, [req.body.name, folderId, userInfo.user_id], (err, data) => {
      if (err) return res.status(500).json('Internal server error')

      return res.status(200).json({ msg: 'Succesfully updated.' })
    })
  })
}
```

### controllers/img.js

```javascript
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
```

### controllers/notes.js

```javascript
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'
import { checkAndDeleteImg } from './img.js'

import dotenv from 'dotenv'

dotenv.config()
const { JWT_SECRET } = process.env

// Get and Add notes
export const getNotes = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = `SELECT note_id, name, content, created_date, deleted, archive, favorite, folder_id FROM notes WHERE user_id = ? ORDER BY created_date DESC`

    db.query(q, [userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json('You can view only your notes!')

      return res.status(200).json(data)
    })
  })
}

export const getNote = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = `SELECT note_id, name, content, created_date, deleted, archive, favorite, folder_id FROM notes WHERE note_id = ? AND user_id = ?`

    db.query(q, [req.params.id, userInfo.user_id], (err, data) => {
      if (err || data.length === 0)
        return res.status(403).json('You can view only your notes!')

      return res.status(200).json(data[0])
    })
  })
}

export const addNote = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q =
      'INSERT INTO notes(`note_id`,`name`, `content`, `folder_id`, `user_id`) VALUES (?)' // `deleted`, `favorite`, `archive`,

    const values = [
      uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      req.body.name,
      `${req.body.content}`,
      req.body.folder_id,

      // req.body.deleted || false,
      // req.body.favorite || false,
      // req.body.archive || false,

      userInfo.user_id,
    ]

    if (req.body.name === '')
      return res.status(403).json('Name cannot be empty!')

    db.query(q, [values], (err, data) => {
      console.log(err)
      if (err) return res.status(500).json(err)

      return res.status(200).json('Note has been created.')
    })
  })
}

// delete note
export const deleteNote = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const noteId = req.params.id
    const q = 'DELETE FROM notes WHERE note_id = ? AND user_id = ?'

    // get note content
    const q2 = 'SELECT content FROM notes WHERE note_id = ? AND user_id = ?'
    let oldContent = ''

    db.query(q2, [noteId, userInfo.user_id], (_err, _data) => {
      if (_err) {
        console.log(_err)
        return res.status(500).json(_err)
      }

      oldContent = _data[0]?.content

      db.query(q, [noteId, userInfo.user_id], (err, data) => {
        if (err) return res.status(500).json(err)

        try {
          checkAndDeleteImg(oldContent ? oldContent : '', '')
        } catch (error) {
          console.log(error)
          return res.status(500).json(error)
        }

        return res.status(200).json('Note has been deleted.')
      })
    })
  })
}

// update note
export const updateNote = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const noteId = req.params.id
    const name = {
      value: req.body.name,
      bool: req.body.name ? req.body.name !== '' : false,
    }
    const content = {
      value: req.body.content,
      bool: req.body.content ? true : false,
    }
    const folderId = {
      value: req.body.folder_id,
      bool: req.body.folder_id ? true : false,
    }
    const archive = {
      value: req.body.archive,
      bool: req.body.archive !== undefined ? true : false,
    }
    const favorite = {
      value: req.body.favorite,
      bool: req.body.favorite !== undefined ? true : false,
    }
    const deleted = {
      value: req.body.deleted,
      bool: req.body.deleted !== undefined ? true : false,
    }

    const q = `UPDATE notes SET ${name.bool ? '`name` = ?' : ''}
    ${content.bool ? (name.bool ? ',' : '') + ` content = ?` : ''}
    ${
      folderId.bool
        ? (name.bool || content.bool ? ',' : '') + ` folder_id = ?`
        : ''
    }
    ${
      archive.bool
        ? (name.bool || content.bool || folderId.bool ? ',' : '') +
          ` archive = ?`
        : ''
    }
    ${
      favorite.bool
        ? (name.bool || content.bool || folderId.bool || archive.bool
            ? ','
            : '') + ` favorite = ?`
        : ''
    }
    ${
      deleted.bool
        ? (name.bool ||
          content.bool ||
          folderId.bool ||
          archive.bool ||
          favorite.bool
            ? ','
            : '') + ` deleted = ?`
        : ''
    }
    WHERE note_id = ? AND user_id = ?`

    const newContent = `${req.body.content}`
    const values = [
      name.bool && `${name.value}`,
      content.bool && `${content.value}`,
      folderId.bool && folderId.value,
      archive.bool && archive.value,
      favorite.bool && favorite.value,
      deleted.bool && deleted.value,
      noteId,
      userInfo.user_id,
    ].filter(function (item) {
      return item !== false
    }) // remove undefined (false) values

    if (name.bool && req.body.name === '')
      return res.status(403).json('Name cannot be empty!')

    const q2 = 'SELECT content FROM notes WHERE note_id = ? AND user_id = ?'
    let oldContent = ''
    db.query(q2, [noteId, userInfo.user_id], (_err, _data) => {
      if (_err) {
        console.log(_err)
        return res.status(500).json("Internal server error. Can't update note.")
      }

      oldContent = _data[0]?.content
      db.query(q, [...values, noteId, userInfo.user_id], (err, data) => {
        if (err) {
          console.log(err)
          return res
            .status(500)
            .json("Internal server error. Can't update note.")
        }

        try {
          checkAndDeleteImg(oldContent ? oldContent : '', newContent)
        } catch (error) {
          console.log(error)
          return res
            .status(500)
            .json("Internal server error. Can't update note.")
        }

        return res.json('Note has been updated.')
      })
    })
  })
}
```

### controllers/shares.js

```javascript
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'
import { checkAndDeleteImg } from './img.js'

import dotenv from 'dotenv'

dotenv.config()
const { JWT_SECRET } = process.env

export const getShares = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = 'SELECT * FROM shares WHERE user_id = ?'

    db.query(q, [userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json('You can view only your notes!')

      return res.status(200).json(data)
    })
  })
}

export const getShare = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q =
      'SELECT s.share_id, n.note_id , name, content, folder_id, n.created_date, deleted, n.user_id FROM shares s JOIN notes n ON s.note_id = n.note_id WHERE s.share_id = ?'

    // not added - favorite, folder_id, archive, folder_name

    db.query(q, [req.params.id], (err, data) => {
      if (err || data.length === 0)
        return res.status(403).json('No shared note found!')

      return res.status(200).json(data[0])
    })
  })
}

export const addShare = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const _q = 'SELECT * FROM shares WHERE `note_id` = ? AND `user_id` = ?'
    const q =
      'INSERT INTO shares(`share_id`, `note_id`,`user_id`) VALUES (?, ?, ?)'

    const id = uuidv4()
    const values = [req.body.note_id, userInfo.user_id]

    // check if the note is already shared or not if not then add it to shared table and return the shared id

    db.query(_q, values, (_err, _data) => {
      if (_err) {
        return res.status(500).json(_err)
      }

      if (_data.length > 0) {
        return res.json({
          msg: 'Note is already shared.',
          share_id: _data[0].share_id,
        })
      } else {
        db.query(q, [id, ...values], (err, data) => {
          if (err) {
            return res.status(500).json(err)
          }

          return res.json({
            msg: 'Shared note has been created.',
            share_id: id,
          })
        })
      }
    })
  })
}

export const deleteShare = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const share_id = req.params.id
    const q = 'DELETE FROM shares WHERE `share_id` = ? AND `user_id` = ?'

    db.query(q, [share_id, userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json('You can delete only your note!')

      return res.json('Note has been deleted!')
    })
  })
}
```

### controllers/users.js

```javascript
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '../db.js'

dotenv.config()
const { JWT_SECRET } = process.env

export const updateUser = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) {
      return res.status(403).json('Token is not valid!')
    }

    const q = 'SELECT * from users WHERE user_id = ?'

    db.query(q, [userInfo.user_id], (err, data) => {
      if (err || data.length === 0) {
        return res.status(403).json('User does not exist!')
      }

      const isPasswordCorrect = bcrypt.compareSync(
        req.body.currentPassword,
        data[0].password
      )

      if (!isPasswordCorrect) {
        return res
          .status(403)
          .json({ msg: 'Password is not correct!', status: 403 })
      }

      const q = 'UPDATE users SET `password` = ? WHERE `user_id` = ?'

      const salt = bcrypt.genSaltSync(10)
      const hash =
        req.body.password !== ''
          ? bcrypt.hashSync(req.body.password, salt)
          : data[0].password

      const values = [hash, userInfo.user_id]

      db.query(q, values, (err, newData) => {
        if (err) {
          return res.status(500).json(err)
        }

        return res
          .status(200)
          .json({ msg: 'Updated successfully!', status: 200 })
      })
    })
  })
}
```

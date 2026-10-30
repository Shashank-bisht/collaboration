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

// Testing db
// db.query(`SELECT created_date FROM notes limit 3`, (err, data) => {
//   if (err) {
//     console.log(err)
//   }
//   console.log(data)
// })

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
  const q = `SELECT favorite FROM notes limit 3`

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

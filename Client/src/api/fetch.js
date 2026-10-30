import axios from 'axios'

// .env file is used to store environment variables
// console.log(process.env.REACT_APP_SERVER_API_BASE_URL) // http://localhost:9000;

// Create a custom Axios instance with the base URL set to http://localhost:9000
// If you want same frontend server use '/' in base URL
const instance = axios.create({
  baseURL: 'http://localhost:9000',
  withCredentials: true, // Add withCredentials option to include cookies in cross-origin requests  (CORS)
})

/* -- NOTE: if you want to change '/api' to something else, you have to change it in server/index.js -- */

/* --------------------------------------------------------------- 
    IMAGES SECTION
   --------------------------------------------------------------- */

/* -- 
    NOTE: this is special-route that doesn't need '/api' prefix (b/z it will be difficult to update the img scr if we change the prefix like '/api' to something)
   -- */

export const xUploadImg = async (formData) => {
  const response = await instance.post('/img', formData)
  return response?.data
}

/* --------------------------------------------------------------- 
    NOTES SECTION
   --------------------------------------------------------------- */

export const xGetNotes = async (
  setNotes,
  setFavorites,
  setArchive,
  setTrash
) => {
  const response = await instance.get('/api/notes')

  // favorite: 0/1, archive: 0, deleted: 0
  setNotes(
    response.data?.filter((obj) => obj.archive === 0 && obj.deleted === 0)
  )

  // favorite: 1, archive: 0, deleted: 0
  setFavorites(
    response.data?.filter(
      (obj) => obj.favorite === 1 && obj.archive === 0 && obj.deleted === 0
    )
  )

  // favorite: 0/1, archive: 1, deleted: 0
  setArchive(
    response.data?.filter((obj) => obj.archive === 1 && obj.deleted === 0)
  )

  // favorite: 0/1, archive: 0/1, deleted: 1
  setTrash(response.data?.filter((obj) => obj.deleted === 1))

  // PRIORITIZE FOLDER: TRASH > ARCHIVE > (FAVORITE = NORMAL)
}

export const xAddNote = async (data) => {
  try {
    await instance.post('/api/notes', data)
  } catch (err) {
    alert('something went wrong (xAddNote)')
  }
}

export const xUpdateNote = async (noteId, data) => {
  const response = await instance.put(`/api/notes/${noteId}`, data)
  return response?.data
}

export const xDeleteNote = async (noteId) => {
  await instance.delete(`/api/notes/${noteId}`)
}

/* --------------------------------------------------------------------------
  BOOKMARK SECTION
  --------------------------------------------------------------------------  */

export const xGetBookmarks = async (setBookmarks) => {
  const response = await instance.get('/api/bookmarks')
  setBookmarks(response?.data)
}

export const xAddBookmark = async (data) => {
  await instance.post(`/api/bookmarks`, data)
}

export const xRemoveBookmark = async (bookmarkId) => {
  await instance.delete(`/api/bookmarks/${bookmarkId}`)
}

/* --------------------------------------------------------------------------
  SHARE SECTION
  --------------------------------------------------------------------------  */

export const xGetShare = async (shareId) => {
  const response = await instance.get(`/api/shares/${shareId}`)
  return response
}

export const xAddShare = async (data) => {
  const response = await instance.post('/api/shares', data)
  return response?.data
}

export const xDeleteShare = async (shareId) => {
  await instance.delete(`/api/shares/${shareId}`)
}

export const xGetCollaborators = async (shareId) => {
  const response = await instance.get(`/api/shares/${shareId}/collaborators`)
  return response?.data
}

export const xAddCollaborator = async (shareId, user, role) => {
  const response = await instance.post(`/api/shares/${shareId}/collaborators`, {
    user,
    role,
  })
  return response?.data
}

export const xUpdateCollaborator = async (shareId, userId, role) => {
  const response = await instance.put(
    `/api/shares/${shareId}/collaborators/${userId}`,
    { role }
  )
  return response?.data
}

export const xDeleteCollaborator = async (shareId, userId) => {
  await instance.delete(`/api/shares/${shareId}/collaborators/${userId}`)
}

/* --------------------------------------------------------------------------
  FOLDERS SECTION
  --------------------------------------------------------------------------  */

export const xGetFolders = async (setFolders) => {
  const response = await instance.get(`/api/folders`)
  setFolders(response?.data)
}

export const xAddFolder = async (name) => {
  const response = await instance.post(`/api/folders`, { name })
  return response?.data
}

export const xUpdateFolder = async (folderId, name) => {
  const response = await instance.put(`/api/folders/${folderId}`, { name })
  return response?.data
}

export const xDeleteFolder = async (folderId) => {
  const response = await instance.delete(`/api/folders/${folderId}`)
  return response?.data
}

export const xGetShares = async (setShares) => {
  const response = await instance.get('/api/shares')
  setShares(response?.data)
}

export const xGetSharedWithMe = async () => {
  const response = await instance.get('/api/shares/with-me')
  return response?.data
}

export const xGetSharePresence = async (shareId) => {
  const response = await instance.get(`/api/shares/${shareId}/presence`)
  return response?.data
}

export const xUpdateSharePresence = async (shareId, status, sessionId) => {
  const response = await instance.put(`/api/shares/${shareId}/presence`, {
    status,
    session_id: sessionId,
  })
  return response?.data
}

export const xDeleteSharePresence = async (shareId, sessionId) => {
  const response = await instance.delete(`/api/shares/${shareId}/presence`, {
    data: { session_id: sessionId },
  })
  return response?.data
}

/* --------------------------------------------------------------------------
  AUTH SECTION
  --------------------------------------------------------------------------  */

// no matter user manually insert user_id in localStorage, it will be verified only if access_token is valid
export const xVerify = async (setCurrentUserId) => {
  const response = await instance.post('/api/auth')
  const success = response?.data?.status === 200

  setCurrentUserId(success ? response?.data?.user_id : null)
  return success
}

export const xlogin = async (setCurrentUserId, inputs) => {
  const response = await instance.post('/api/auth/login', inputs)
  setCurrentUserId(response?.data ? response?.data.user_id : null)
  return response?.data
}

export const xLogout = async (setCurrentUserId) => {
  await instance.post('/api/auth/logout')
  setCurrentUserId(null)
}

export const xRegister = async (inputs) => {
  const response = await instance.post('/api/auth/register', inputs)
  return response?.data
}

# Writer

A note-taking application inspired by Notion, built with a React frontend and an Express + MySQL backend. Users can sign up, create folders and notes, favorite/archive/trash notes, search content, and invite other registered accounts to shared notes as viewers or editors.

This project is split into two separate apps:

- `Client/` — React frontend
- `Server/` — Express API and database layer

## Tech stack

- Frontend: React, React Router, Tailwind CSS, Radix UI, Tiptap, Zustand
- Backend: Node.js, Express
- Database: MySQL
- Auth: JWT + bcryptjs
- File upload: multer

## Project structure

```text
Writer-main/
├── Client/                # React frontend
│   ├── .env               # frontend environment variables
│   ├── package.json
│   ├── public/
│   └── src/
├── Server/                # Express backend
│   ├── .env               # backend environment variables
│   ├── controllers/
│   ├── routes/
│   ├── db.js              # MySQL pool + automatic table creation
│   ├── index.js           # app entry point
│   ├── package.json
│   ├── public/
│   └── _.sql              # MySQL schema script
├── README.md              # project setup guide
└── .gitignore
```

## Prerequisites

Before running this project locally, install:

- Node.js 18+ (recommended)
- npm
- MySQL 8.x or compatible version
- A MySQL client such as MySQL Workbench or the terminal client

## Local setup

### 1) Clone and open the project

```bash
cd Writer-main
```

### 2) Install MySQL and create the database

Start MySQL locally and create a database named `writer`:

```sql
CREATE DATABASE writer;
```

You can also use the included SQL script if you want a fresh schema:

```bash
mysql -u root -p
SOURCE C:/path/to/Writer-main/Server/_.sql
```

Warning: `Server/_.sql` drops and recreates the `writer` database, so running it deletes existing project data. For a normal setup or upgrade, create the database and let the backend create missing tables automatically.

### 3) Configure environment variables

#### Backend (`Server/.env`)

The project includes a backend `.env` file with defaults:

```env
NODE_ENV=development
PORT=9000
X_CLIENT_URL=http://localhost:3000

DB_HOST=localhost
DB_USER=root
DB_KEY=root
DB_NAME=writer

SALT_KEY=10
JWT_SECRET=secret-key
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIR_IN=7
```

If your MySQL password is different, update these values:

- `DB_HOST`
- `DB_USER`
- `DB_KEY`
- `DB_NAME`

If you are developing on a different frontend port, update `X_CLIENT_URL` accordingly.

For development, `X_CLIENT_URL=*` is also allowed in the codebase and will allow requests from any origin.

#### Frontend (`Client/.env`)

```env
REACT_APP_SERVER_API_BASE_URL=http://localhost:9000
```

This tells the React app where to send API requests.

### 4) Install server dependencies

```bash
cd Server
npm install
```

### 5) Start the backend

```bash
npm run dev
```

The server listens on:

- http://localhost:9000

The server will also automatically attempt to create the required MySQL tables in `db.js` when it starts.

### 6) Install frontend dependencies

Open a second terminal:

```bash
cd Client
npm install
```

### 7) Start the frontend

```bash
npm start
```

The frontend uses the React dev server and will start on:

- http://localhost:3000

## Application flow

- Frontend runs on `localhost:3000`
- Backend API runs on `localhost:9000`
- The client is configured with a proxy/base URL for the API: `http://localhost:9000`
- The backend uses cookies for JWT auth, so credentials must be enabled in browser requests

## Important configuration notes

### CORS

The backend in `Server/index.js` sets CORS behavior using `X_CLIENT_URL`.

For local development, you typically want:

```env
X_CLIENT_URL=http://localhost:3000
```

If you change the frontend port or run the client from another domain, update this value.

### JWT auth

The backend expects these values in `Server/.env`:

```env
JWT_SECRET=secret-key
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIR_IN=7
```

If you change the secret, users will be forced to log in again.

### Database connection

The backend uses `mysql2.createPool()` in `Server/db.js`:

```js
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_KEY,
database: process.env.DB_NAME,
```

Ensure the MySQL user has permission to access the `writer` database.

## Default project behavior

The app includes these main features:

- User registration and login
- Create, update, and delete folders
- Create, edit, and delete notes
- Favorite, archive, and trash actions
- Search notes and folders
- Invite registered users to shared notes as viewers or editors
- Edit shared notes when granted editor access
- See who is viewing or editing an open shared note
- Protect concurrent title/content edits with version conflict detection
- Revoke collaborator access or remove a note's invitation link
- Bookmark shared notes
- Find notes shared with your account in the **Shared with me** section after signing in

## Shared-note permissions

To collaborate on a note, open the note's menu and choose **Share with accounts** (or **Manage access** if it already has an invitation link). Create the invitation link, then invite the person's registered Writer username or email and choose **Viewer** or **Editor**.

- **Owner:** can manage invites and change all note fields.
- **Editor:** can change the note title and content, but cannot move, archive, favorite, or delete it.
- **Viewer:** can read the note but cannot edit it.

The invitation URL alone does not grant access; the invited person must sign in to the account that was invited. Removing a collaborator revokes their access. Removing the invitation link revokes access for all collaborators on that note.

After signing in, an invited collaborator can open **Shared with me** from the sidebar to find their notes again.

## Concurrent edit protection

Every note has a version number. When saving a title or content edit, the server checks that the version opened by the editor is still current. If another user saved first, the stale save is rejected and the editor can choose **Reload latest version**; the local draft remains visible until they choose to reload. The Server adds the version column to existing databases at startup.

## Live presence

When a shared note is open, the note header shows the active collaborators and whether they are viewing or editing. A collaborator is marked as editing after changing the title or note content, and returns to viewing after ten seconds without changes. Presence refreshes every five seconds and expires after 30 seconds without a heartbeat, including after a browser is closed unexpectedly. Presence is held in the running Server process, so the backend should run as a single process for this local version.

The server creates the `note_collaborators` table automatically on startup and migrates the earlier note-based collaborator schema to the current share-based schema without dropping active invitations. Existing shared links are now restricted to the owner and invited accounts; restart the backend after updating the project.

## Useful SQL schema reference

The database schema is defined in `Server/_.sql` and includes tables:

- `users`
- `folders`
- `notes`
- `shares`
- `note_collaborators`
- `bookmarks`

The backend also creates these tables automatically if they do not exist.

## Troubleshooting

### MySQL connection error

Check:

- MySQL is running
- `DB_HOST`, `DB_USER`, `DB_KEY`, and `DB_NAME` are correct
- The `writer` database exists
- The MySQL user has rights to that database

### CORS error in browser

Update `Server/.env`:

```env
X_CLIENT_URL=http://localhost:3000
```

### Frontend cannot reach backend

Make sure:

- Backend is running on port 9000
- Frontend `.env` points to `http://localhost:9000`
- The backend `PORT` matches the frontend config

### Port already in use

If `3000` or `9000` is occupied, change the port in the relevant `.env` file and restart both apps.

## Production build (optional)

If you want to build the React app for production:

```bash
cd Client
npm run build
```

The backend is configured to serve static files from `Server/public/build`, but for normal local development you can simply run the frontend in dev mode with `npm start`.

## Final run checklist

Use this order:

```bash
# 1. MySQL: create database writer
# 2. Server
cd Server
npm install
npm run dev

# 3. Client (new terminal)
cd Client
npm install
npm start
```

Then open:

- http://localhost:3000

If you want, I can also generate a more polished version of this README with screenshots, sample `.env` files, and a Windows-specific setup section.

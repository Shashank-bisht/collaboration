import dotenv from 'dotenv'
import mysql2 from 'mysql2'

dotenv.config()

// Collection of connection to the database
export const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_KEY,
  database: process.env.DB_NAME,
  // port: 3306,
  // ssl: JSON.parse(process.env.DB_SSL),
})

// Function to create tables serially
const createTables = async () => {
  try {
    // Create users table
    await db.promise().query(
      `CREATE TABLE IF NOT EXISTS users (
        user_id VARCHAR(45) PRIMARY KEY NOT NULL,
        username VARCHAR(45) UNIQUE NOT NULL,
        email VARCHAR(45) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );`
    )
    console.log('users table created')

    // Create folders table
    await db.promise().query(
      `CREATE TABLE IF NOT EXISTS folders (
        folder_id VARCHAR(45) PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        user_id VARCHAR(45) NOT NULL,
        CONSTRAINT f_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
      );`
    )
    console.log('folders table created')

    // Create notes table
    await db.promise().query(
      `CREATE TABLE IF NOT EXISTS notes (
        note_id VARCHAR(45) PRIMARY KEY NOT NULL,
        name VARCHAR(255) DEFAULT NULL,
        content TEXT DEFAULT NULL,
        version BIGINT UNSIGNED NOT NULL DEFAULT 1,
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deleted BOOLEAN DEFAULT false,
        favorite BOOLEAN DEFAULT false,
        archive BOOLEAN DEFAULT false,
        folder_id VARCHAR(45) NOT NULL,
        CONSTRAINT n_folder_id FOREIGN KEY (folder_id) REFERENCES folders(folder_id) ON DELETE CASCADE ON UPDATE CASCADE,
        user_id VARCHAR(45) NOT NULL,
        CONSTRAINT n_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
      );`
    )
    console.log('notes table created')

    const [noteColumns] = await db.promise().query('SHOW COLUMNS FROM notes')
    if (!noteColumns.some((column) => column.Field === 'version')) {
      await db.promise().query(
        'ALTER TABLE notes ADD COLUMN version BIGINT UNSIGNED NOT NULL DEFAULT 1'
      )
      console.log('Added note versions for concurrent edit protection')
    }

    // Create shares table
    await db.promise().query(
      `CREATE TABLE IF NOT EXISTS shares (
        share_id VARCHAR(45) PRIMARY KEY NOT NULL,
        note_id VARCHAR(45) UNIQUE NOT NULL,
        CONSTRAINT s_note_id FOREIGN KEY (note_id) REFERENCES notes(note_id) ON DELETE CASCADE ON UPDATE CASCADE,
        user_id VARCHAR(45) NOT NULL,
        CONSTRAINT s_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
      );`
    )
    console.log('shares table created')

    // Create note collaborators table
    await db.promise().query(
      `CREATE TABLE IF NOT EXISTS note_collaborators (
        share_id VARCHAR(45) NOT NULL,
        user_id VARCHAR(45) NOT NULL,
        role ENUM('viewer', 'editor') NOT NULL DEFAULT 'viewer',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (share_id, user_id),
        CONSTRAINT nc_share_id FOREIGN KEY (share_id) REFERENCES shares(share_id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT nc_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
      );`
    )
    console.log('note_collaborators table created')

    const [collaboratorColumns] = await db
      .promise()
      .query('SHOW COLUMNS FROM note_collaborators')
    const hasShareId = collaboratorColumns.some(
      (column) => column.Field === 'share_id'
    )
    const hasLegacyNoteId = collaboratorColumns.some(
      (column) => column.Field === 'note_id'
    )

    if (!hasShareId && hasLegacyNoteId) {
      const [orphanedCollaborators] = await db.promise().query(
        `SELECT COUNT(*) AS count
         FROM note_collaborators c
         LEFT JOIN shares s ON s.note_id = c.note_id
         WHERE s.share_id IS NULL`
      )

      if (Number(orphanedCollaborators[0].count) > 0) {
        const [result] = await db.promise().query(
          `DELETE c FROM note_collaborators c
           LEFT JOIN shares s ON s.note_id = c.note_id
           WHERE s.share_id IS NULL`
        )
        console.log(
          `Revoked ${result.affectedRows} collaborator grants without an active share link`
        )
      }

      await db.promise().query(
        'ALTER TABLE note_collaborators ADD COLUMN share_id VARCHAR(45) NULL AFTER note_id'
      )
      await db.promise().query(
        `UPDATE note_collaborators c
         JOIN shares s ON s.note_id = c.note_id
         SET c.share_id = s.share_id`
      )
      await db.promise().query(
        `ALTER TABLE note_collaborators
         DROP FOREIGN KEY nc_note_id,
         DROP PRIMARY KEY,
         MODIFY COLUMN note_id VARCHAR(45) NULL,
         MODIFY COLUMN share_id VARCHAR(45) NOT NULL,
         ADD PRIMARY KEY (share_id, user_id),
         ADD CONSTRAINT nc_share_id FOREIGN KEY (share_id)
           REFERENCES shares(share_id) ON DELETE CASCADE ON UPDATE CASCADE`
      )
      console.log('Migrated note collaborators to share-based permissions')
    }

    // Create bookmarks table
    await db.promise().query(
      `CREATE TABLE IF NOT EXISTS bookmarks (
        bookmark_id VARCHAR(45) PRIMARY KEY NOT NULL,
        share_id VARCHAR(45) NOT NULL,
        CONSTRAINT b_share_id FOREIGN KEY (share_id) REFERENCES shares(share_id) ON DELETE CASCADE ON UPDATE CASCADE,
        user_id VARCHAR(45) NOT NULL,
        CONSTRAINT b_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
      );`
    )
    console.log('bookmarks table created')
  } catch (err) {
    console.error(err)
  }
}

// Run the function to create tables
createTables()

// - This is an alternative way to connect to the database.
// export const db = mysql2.createPool(process.env.DATABASE_URL)

// - createPool() is used for handling multiple connections at a time.
// - createConnection() is used for handling single connection at a time.
// - createPool() is faster than createConnection().
// - createPool() is a wrapper around createConnection().

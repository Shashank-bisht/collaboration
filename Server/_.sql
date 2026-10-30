-- charset: utf8mb4, collation: utf8mb4_0900_ai_ci

drop database writer;
create database writer;
use writer;

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
    version BIGINT UNSIGNED NOT NULL DEFAULT 1,
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


CREATE TABLE note_collaborators (
    share_id VARCHAR(45) NOT NULL,
    user_id VARCHAR(45) NOT NULL,
    role ENUM('viewer', 'editor') NOT NULL DEFAULT 'viewer',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (share_id, user_id),
    CONSTRAINT nc_share_id FOREIGN KEY (share_id) REFERENCES shares(share_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT nc_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE bookmarks (
    bookmark_id VARCHAR(45) PRIMARY KEY NOT NULL,
    share_id VARCHAR(45) NOT NULL,
    CONSTRAINT b_share_id FOREIGN KEY (share_id) REFERENCES shares(share_id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id VARCHAR(45) NOT NULL,
    CONSTRAINT b_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- ALTER TABLE users ENGINE = InnoDB; -- (optional)
-- ALTER TABLE folders ENGINE = InnoDB; -- (optional)
-- ALTER TABLE notes ENGINE = InnoDB; -- (optional)
-- ALTER TABLE shares ENGINE = InnoDB; -- (optional)
-- ALTER TABLE bookmarks ENGINE = InnoDB; -- (optional)
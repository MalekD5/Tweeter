import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config();

export const authTable = 'auth',
  userTable = 'users',
  tweetsTable = 'tweets',
  bookmarkTable = 'bookmarks',
  likesTable = 'likes',
  retweetsTable = 'retweets',
  commentsTable = 'comments';

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const AUTH_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS auth (id INT NOT NULL AUTO_INCREMENT, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, refreshToken VARCHAR(255), PRIMARY KEY(id), UNIQUE (email));`;

const USER_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${userTable}(id INT NOT NULL, username VARCHAR(25) NOT NULL,displayname VARCHAR(40) NOT NULL, bio VARCHAR(250), pfp VARCHAR(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (id) REFERENCES ${authTable}(id), PRIMARY KEY(username));`;

const TWEET_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${tweetsTable} 
(id VARCHAR(36) NOT NULL, author INT NOT NULL, content VARCHAR(280) NOT NULL, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, likes INT DEFAULT 0, comments INT DEFAULT 0, retweets INT DEFAULT 0, type ENUM('TEXT', 'COMMENT') DEFAULT 'TEXT', PRIMARY KEY(id), FOREIGN KEY (author) REFERENCES ${authTable}(id));`;

const BOOKMARKS_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${bookmarkTable} (user_id INT NOT NULL, tweet VARCHAR(36) NOT NULL, FOREIGN KEY(user_id) REFERENCES ${authTable}(id), FOREIGN KEY(tweet) REFERENCES ${tweetsTable}(id) ON DELETE CASCADE, PRIMARY KEY(user_id, tweet));`;

const LIKES_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${likesTable} (user_id INT NOT NULL, tweet_id VARCHAR(36) NOT NULL, FOREIGN KEY (user_id) REFERENCES ${authTable}(id), FOREIGN KEY (tweet_id) REFERENCES ${tweetsTable}(id) ON DELETE CASCADE, PRIMARY KEY (user_id, tweet_id))`;

const RETWEET_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${retweetsTable} (user_id INT NOT NULL, tweet_id VARCHAR(36) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES ${authTable}(id), FOREIGN KEY (tweet_id) REFERENCES ${tweetsTable}(id) ON DELETE CASCADE, PRIMARY KEY (user_id, tweet_id))`;

const COMMENTS_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${commentsTable} (replying_to VARCHAR(36) NOT NULL, comment_id VARCHAR(36) NOT NULL, author INT NOT NULL, FOREIGN KEY (replying_to) REFERENCES ${tweetsTable}(id) ON DELETE CASCADE, FOREIGN KEY (comment_id) REFERENCES ${tweetsTable}(id) ON DELETE CASCADE, FOREIGN KEY (author) REFERENCES ${authTable}(id), PRIMARY KEY (comment_id))`;

export async function connect() {
  const connection = await pool.getConnection();
  try {
    [
      AUTH_TABLE_QUERY,
      USER_TABLE_QUERY,
      TWEET_TABLE_QUERY,
      BOOKMARKS_TABLE_QUERY,
      LIKES_TABLE_QUERY,
      RETWEET_TABLE_QUERY,
      COMMENTS_TABLE_QUERY
    ].forEach(async (x) => {
      await connection.execute(x);
    });
  } catch (err: any) {
    console.error(err);
  } finally {
    connection.release();
  }
}

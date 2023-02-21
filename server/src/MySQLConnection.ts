import mysql from 'mysql2';
import { config } from 'dotenv';

config();

const authTable = 'auth',
  tweetsTable = 'tweets',
  verifyTable = 'verify';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const AUTH_TABLE_QUERY = `
      CREATE TABLE IF NOT EXISTS auth
      (id INT NOT NULL AUTO_INCREMENT, username VARCHAR(25) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, refreshToken VARCHAR(255), PRIMARY KEY(id), verified CHAR(1) DEFAULT 0 NOT NULL, UNIQUE (email), UNIQUE (username));
      `;

const VERIFY_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${verifyTable} 
      (user_id INT NOT NULL, verifyCode VARCHAR(12) NOT NULL, PRIMARY KEY (user_id), FOREIGN KEY (user_id) REFERENCES ${authTable}(id), UNIQUE(verifyCode))`;

const TWEET_TABLE_QUERY = `
      CREATE TABLE IF NOT EXISTS ${tweetsTable} 
      (tweetid VARCHAR(36) NOT NULL, tweetedBy INT NOT NULL, tweetText VARCHAR(280) NOT NULL, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(tweetid), FOREIGN KEY (tweetedBy) REFERENCES ${authTable}(id));
      `;

async function connect() {
  const connection = await pool.promise().getConnection();
  try {
    await connection.execute(AUTH_TABLE_QUERY);
    await connection.execute(VERIFY_TABLE_QUERY);
    await connection.execute(TWEET_TABLE_QUERY);
  } catch (err: any) {
    console.error(err);
  } finally {
    connection.release();
  }
}

export { pool, authTable, tweetsTable, verifyTable, connect };

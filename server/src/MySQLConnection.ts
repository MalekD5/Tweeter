import mysql from 'mysql2';
import { config } from 'dotenv';

config();

const authTable = 'auth',
  postsTable = 'posts',
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

const POST_TABLE_QUERY = `
      CREATE TABLE IF NOT EXISTS ${postsTable} 
      (postid VARCHAR(36) NOT NULL, postedBy INT NOT NULL, postText VARCHAR(280) NOT NULL, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(postid), FOREIGN KEY (postedBy) REFERENCES ${authTable}(id));
      `;

async function connect() {
  const connection = await pool.promise().getConnection();
  try {
    await connection.execute(AUTH_TABLE_QUERY);
    await connection.execute(VERIFY_TABLE_QUERY);
    await connection.execute(POST_TABLE_QUERY);
  } catch (err: any) {
    console.error(err);
  } finally {
    connection.release();
  }
}

export function rollback(con: mysql.PoolConnection, err: mysql.QueryError) {
  return con.rollback(() => {
    con.release();
    throw err;
  });
}

export { pool, authTable, postsTable, verifyTable, connect };

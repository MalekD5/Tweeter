import mysql from 'mysql2';
import { config } from 'dotenv';

config();

async function connect() {
  return pool
    .promise()
    .query(
      'CREATE TABLE IF NOT EXISTS authentication(username VARCHAR(25) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, refreshToken VARCHAR(255), PRIMARY KEY(email), UNIQUE (username));'
    );
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

export { pool, connect };

import mysql from 'mysql2';
import { config } from 'dotenv';

config();

const authTable = 'auth',
  postsTable = 'posts';

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

async function connect() {
  return pool.getConnection((err, connection) => {
    connection.beginTransaction((err) => {
      if (err) throw err;

      connection.query(
        `
      CREATE TABLE IF NOT EXISTS auth
      (id INT NOT NULL AUTO_INCREMENT, username VARCHAR(25) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, refreshToken VARCHAR(255), PRIMARY KEY(id), UNIQUE (email), UNIQUE (username));
      `,
        (error, _results, _fields) => {
          if (error) {
            return connection.rollback(() => {
              throw error;
            });
          }
        }
      );

      connection.query(
        `
      CREATE TABLE IF NOT EXISTS ${postsTable} 
      (postid VARCHAR(36) NOT NULL, postedBy INT NOT NULL, postText VARCHAR(280) NOT NULL, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(postid), FOREIGN KEY (postedBy) REFERENCES ${authTable}(id));
      `,
        (error, _results, _fields) => {
          if (error)
            return connection.rollback(() => {
              throw error;
            });
        }
      );

      connection.commit((error) => {
        if (error)
          return pool.rollback(() => {
            throw error;
          });
      });
    });
  });
}

export { pool, authTable, postsTable, connect };

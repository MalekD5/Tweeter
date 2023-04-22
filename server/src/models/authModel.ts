import { authTable, pool, userTable } from '@/mysql';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

type AuthData = {
  id: number;
  email: string;
  password: string;
  refreshToken: string;
};

interface AuthRowResponse extends RowDataPacket, AuthData {}

export async function find(email: string) {
  const [response] = await pool.query<AuthRowResponse[]>(
    `SELECT * from ${authTable} WHERE email=?`,
    [email]
  );

  if (response.length === 0) return undefined;
  return response[0];
}

export async function findByRefreshToken(token: string) {
  const [response] = await pool.query<AuthRowResponse[]>(
    `SELECT id,email,password,refreshToken from ${authTable} WHERE refreshToken=?`,
    [token]
  );
  if (response.length === 0) return undefined;
  return response[0] as AuthData;
}

export async function setRefreshToken(id: number, token: string) {
  await pool.query(`UPDATE ${authTable} SET refreshToken=? WHERE id=?`, [
    token,
    id
  ]);
}

export async function createUser(
  email: string,
  password: string,
  username: string,
  displayname: string
) {
  let con = null;
  try {
    con = await pool.getConnection();
    await con.beginTransaction();
    const [result] = await con.query<ResultSetHeader>(
      `INSERT INTO ${authTable}(email, password) VALUES(?,?)`,
      [email, password]
    );

    const id = result.insertId;
    await con.execute(
      `INSERT INTO ${userTable}(id, username, displayname) VALUES(?,?,?)`,
      [id, username, displayname]
    );
    await con.commit();
    return id;
  } catch (err: any) {
    con?.rollback();
    throw err;
  } finally {
    con?.release();
  }
}

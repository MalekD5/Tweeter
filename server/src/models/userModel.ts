import { pool, authTable } from '../MySQLConnection';
import type { RowDataPacket } from 'mysql2';
import fs from 'fs';
import path from 'path';

interface ResponseUser extends RowDataPacket, User {}

const SELECT_USER_BY_EMAIL = `SELECT * FROM ${authTable} WHERE email=?`;
const SELECT_USER_BY_REFRESH_TK = `SELECT * FROM ${authTable} WHERE refreshToken=?`;
const SELECT_USERNAME_OR_EMAIL = `SELECT email,username FROM ${authTable} WHERE email=? OR username=?`;

const UPDATE_USER = `UPDATE ${authTable} SET refreshToken=? WHERE email=?`;
const INSERT_USER = `INSERT INTO ${authTable}(username, email, password) VALUES(?,?,?);`;

class User {
  id: number;
  username: string;
  email: string;
  password: string;
  refreshToken: string;
  verified: string;
  pfp: string;

  constructor(
    id: number,
    email: string,
    username: string,
    password: string,
    refreshToken: string,
    verified: string,
    pfp: string
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.refreshToken = refreshToken;
    this.verified = verified;
    this.pfp = pfp;
  }

  async save() {
    await pool.promise().execute(UPDATE_USER, [this.refreshToken, this.email]);
  }
}

export async function findByEmail(email: string): Promise<User | undefined> {
  const [users] = await pool
    .promise()
    .execute<ResponseUser[]>(SELECT_USER_BY_EMAIL, [email]);

  if (!users || users.length === 0) return undefined;

  const [user] = users;

  return new User(
    user.id,
    user.email,
    user.username,
    user.password,
    user.refreshToken,
    user.verified,
    user.pfp
  );
}

export async function findByRefreshToken(
  refreshToken: string
): Promise<User | undefined> {
  const [users] = await pool
    .promise()
    .execute<ResponseUser[]>(SELECT_USER_BY_REFRESH_TK, [refreshToken]);

  if (!users || users.length === 0) return undefined;

  const [user] = users;

  return new User(
    user.id,
    user.email,
    user.username,
    user.password,
    user.refreshToken,
    user.verified,
    user.pfp
  );
}

export async function checkDuplicate(
  email: string,
  username: string
): Promise<{ email: string; username: string } | undefined> {
  const [users] = await pool
    .promise()
    .execute<ResponseUser[]>(SELECT_USERNAME_OR_EMAIL, [email, username]);

  const [user] = users;
  if (user) {
    return { email: user.email, username: user.username };
  }
  return undefined;
}

export async function create(
  username: string,
  email: string,
  password: string
) {
  const data: any = await pool
    .promise()
    .execute(INSERT_USER, [username, email, password]);
  return data[0].insertId;
}

export async function modifyUserPfp(id: string, pfp: string) {
  const [users] = await pool
    .promise()
    .execute<ResponseUser[]>(`SELECT pfp FROM ${authTable} WHERE id=?`, [id]);

  if (!users || users.length === 0) return Promise.reject('user not found');

  const [user] = users;
  fs.unlink(path.resolve(`./images/${user.pfp}`), () => {});

  return await pool
    .promise()
    .execute(`UPDATE ${authTable} SET pfp=? WHERE id=?`, [pfp, id]);
}

export type { User };

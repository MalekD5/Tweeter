import { pool, authTable } from '../Connection';
import { RowDataPacket } from 'mysql2';

interface ResponseUser extends RowDataPacket {
  username: string;
  email: string;
  password: string;
  refreshToken: string;
}

class User {
  username: string;
  email: string;
  password: string;
  refreshToken: string;

  constructor(
    email: string,
    username: string,
    password: string,
    refreshToken: string
  ) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.refreshToken = refreshToken;
  }

  async save() {
    await pool
      .promise()
      .execute(`UPDATE ${authTable} SET refreshToken=? WHERE email=?`, [
        this.refreshToken,
        this.email
      ]);
  }
}

export async function findByEmail(email: string): Promise<User | undefined> {
  const [users] = await pool
    .promise()
    .execute<ResponseUser[]>(`SELECT * FROM ${authTable} WHERE email=?`, [
      email
    ]);

  if (!users || users.length === 0) return undefined;

  const [user] = users;

  return new User(user.email, user.username, user.password, user.refreshToken);
}

export async function findByRefreshToken(
  refreshToken: string
): Promise<User | undefined> {
  const [users] = await pool
    .promise()
    .execute<ResponseUser[]>(
      `SELECT * FROM ${authTable} WHERE refreshToken=?`,
      [refreshToken]
    );

  if (!users || users.length === 0) return undefined;

  const [user] = users;

  return new User(user.email, user.username, user.password, user.refreshToken);
}

export async function checkDuplicate(
  email: string,
  username: string
): Promise<{ email: string; username: string } | undefined> {
  const [users] = await pool
    .promise()
    .execute<ResponseUser[]>(
      `SELECT email,username FROM ${authTable} WHERE email=? OR username=?`,
      [email, username]
    );

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
  await pool
    .promise()
    .execute(
      `INSERT INTO ${authTable}(username, email, password) VALUES(?,?,?)`,
      [username, email, password]
    );
}

export type { User };

import { pool } from './Connection';
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
      .execute('UPDATE authentication SET refreshToken=? WHERE email=?', [
        this.refreshToken,
        this.email
      ]);
  }
}

export async function findByEmail(email: string): Promise<User | undefined> {
  const [users] = await pool
    .promise()
    .execute<ResponseUser[]>('SELECT * FROM authentication WHERE email=?', [
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
      'SELECT * FROM authentication WHERE refreshToken=?',
      [refreshToken]
    );

  if (!users || users.length === 0) return undefined;

  const [user] = users;

  return new User(user.email, user.username, user.password, user.refreshToken);
}

export async function checkDuplicate(
  email: string,
  username: string
): Promise<User | undefined> {
  const [users] = await pool
    .promise()
    .execute<ResponseUser[]>(
      'SELECT email,username FROM authentication WHERE email=? OR username=?',
      [email, username]
    );

  const [user] = users;
  if (user) {
    {
      user.username, user.email;
    }
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
      'INSERT INTO authentication(username, email, password) VALUES(?,?,?)',
      [username, email, password]
    );
}

export type { User };

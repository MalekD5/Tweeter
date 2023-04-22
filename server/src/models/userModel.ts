import fs from 'fs';
import path from 'path';

import { type RowDataPacket } from 'mysql2';
import { pool, userTable } from '@/mysql';
import { exists } from '@/utils/ModelUtils';

export type UserData = {
  id: number;
  username: string;
  displayname: string;
  created_at: string;
  pfp?: string;
  bio?: string;
};

interface UserRowResponse extends RowDataPacket, UserData { }

export async function find(id: number) {
  const [response] = await pool.query<UserRowResponse[]>(
    `SELECT * from ${userTable} WHERE id=?`,
    [id]
  );

  if (response?.length === 0) return undefined;
  return response[0] as UserData;
}

export async function updateProfilePicture(id: number, pfp_url: string) {
  const [users] = await pool.execute<UserRowResponse[]>(
    `SELECT pfp FROM ${userTable} WHERE id=?`,
    [id]
  );

  if (!exists(users)) throw Error('user not found');

  const [user] = users;
  fs.unlink(path.resolve(`./images/${user.pfp}`), () => { });

  return await pool.execute(`UPDATE ${userTable} SET pfp=? WHERE id=?`, [
    pfp_url,
    id
  ]);
}

export async function updateInfo(
  id: number,
  username: string,
  displayname: string,
  bio: string
) {
  let con = null;
  try {
    con = await pool.getConnection();
    await con.beginTransaction();
    await con.execute(
      `UPDATE ${userTable} SET username=?, displayname=?, bio=? WHERE id=?`,
      [username, displayname, bio, id]
    );
    await con.commit();
  } catch (err: any) {
    con?.rollback();
    throw err;
  } finally {
    con?.release();
  }
}

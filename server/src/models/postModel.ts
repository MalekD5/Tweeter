import { RowDataPacket } from 'mysql2';
import { pool, postsTable } from '../MySQLConnection';
import crypto from 'crypto';

interface Post extends RowDataPacket {
  postid: string;
  postedBy: number;
  postText: string;
  created_at: Date;
}

const INSERT_POST = `INSERT INTO ${postsTable}(postId, postText, postedBy) VALUES(?,?,?)`;
const SELECT_TOP_10_POSTS = `SELECT * FROM ${postsTable} ORDER BY created_at DESC LIMIT 10;`;

export async function createPost(
  postedBy: number,
  postText: string
): Promise<string> {
  const postId = crypto.randomUUID().replace(/-/g, '');

  await pool.promise().execute(INSERT_POST, [postId, postText, postedBy]);

  return postId;
}

export async function retrieveTopPosts(): Promise<Post[]> {
  const [posts] = await pool.promise().query<Post[]>(SELECT_TOP_10_POSTS);
  return posts;
}

export type { Post };

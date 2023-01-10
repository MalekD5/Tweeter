import { RowDataPacket } from 'mysql2';
import { pool, postsTable } from '../Connection';
import crypto from 'crypto';

interface Post extends RowDataPacket {
  postid: string;
  postedBy: number;
  postText: string;
  created_at: Date;
}

export async function createPost(postedBy: number, postText: string) {
  const postId = crypto.randomUUID().replace(/-/g, '');

  await pool
    .promise()
    .execute(
      `INSERT INTO ${postsTable}(postId, postText, postedBy) VALUES(?,?,?)`,
      [postId, postText, postedBy]
    );

  return postId;
}

export async function retrieveTopPosts(): Promise<Post[]> {
  const [posts] = await pool
    .promise()
    .query<Post[]>(
      `SELECT * FROM ${postsTable} ORDER BY created_at DESC LIMIT 10;`
    );
  return posts;
}

export type { Post };

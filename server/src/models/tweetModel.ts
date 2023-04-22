import crypto from 'crypto';

import {
  likesTable,
  pool,
  retweetsTable,
  tweetsTable,
  userTable
} from '../mysql';
import { transformTweets } from '@/utils/ModelUtils';

import type { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface Tweet extends RowDataPacket {
  id: string;
  author: number;
  content: string;
  created_at: string;
  pfp: string;
  likes: number;
  comments: number;
  retweets: number;
  username?: string;
  displayname?: string;
}

const INSERT_TWEET = `INSERT INTO ${tweetsTable}(id, content, author) VALUES(?,?,?)`;
const SELECT_TOP_10_TWEETS = `SELECT twts.*, user.pfp, user.username, user.displayname FROM ${tweetsTable} as twts, ${userTable} as user WHERE author=user.id ORDER BY created_at DESC LIMIT 10;`;
const VERIFY_OWNERSHIP = `SELECT author FROM ${tweetsTable} WHERE id=?`;

export async function createTweet(author: number, text: string) {
  const tweet_id = crypto.randomUUID().replace(/-/g, '');

  await pool.execute(INSERT_TWEET, [tweet_id, text, author]);

  return tweet_id;
}

export async function retrieveTopTweets() {
  const [tweets] = await pool.query<Tweet[]>(SELECT_TOP_10_TWEETS);
  return tweets;
}

export async function isOwnerOfTweet(tweet_id: string, user_id: number) {
  const [tweets] = await pool.query<Tweet[]>(VERIFY_OWNERSHIP, [tweet_id]);
  if (tweets.length === 0) return false;

  const tweet = tweets[0];
  return tweet.author === user_id;
}

export async function getUserTweets(user_id: number) {
  const [tweets] = await pool.query<Tweet[]>(
    `SELECT twts.*, user.pfp, user.username, user.displayname FROM ${tweetsTable} as twts, ${userTable} as user WHERE author=user.id AND author=?`,
    [user_id]
  );
  if (tweets.length === 0) return [];
  return tweets;
}

export async function deleteTweet(user_id: number, tweet_id: string) {
  const isOwner = await isOwnerOfTweet(tweet_id, user_id);
  if (!isOwner) {
    return false;
  }
  await pool.execute(`DELETE FROM ${tweetsTable} WHERE id=?`, [tweet_id]);
  return true;
}

export async function addLike(user_id: number, tweet_id: string) {
  let con = null;
  try {
    con = await pool.getConnection();
    await con.beginTransaction();

    await con.execute(`INSERT INTO ${likesTable} VALUES(?,?)`, [
      user_id,
      tweet_id
    ]);

    await con.execute(`UPDATE ${tweetsTable} SET likes=likes+1 WHERE id=?`, [
      tweet_id
    ]);
    await con.commit();
  } catch (err: any) {
    await con?.rollback();
    throw err;
  } finally {
    con?.release();
  }
}

export async function addRetweet(user_id: number, tweet_id: string) {
  let con = null;
  try {
    con = await pool.getConnection();
    await con.beginTransaction();

    await con.execute(`INSERT INTO ${retweetsTable} VALUES(?,?)`, [
      user_id,
      tweet_id
    ]);

    await con.execute(
      `UPDATE ${tweetsTable} SET retweets=retweets+1 WHERE id=?`,
      [tweet_id]
    );
    await con.commit();
  } catch (err: any) {
    await con?.rollback();
    throw err;
  } finally {
    con?.release();
  }
}

export async function removeLike(user_id: number, tweet_id: string) {
  let con = null;
  try {
    con = await pool.getConnection();
    await con.beginTransaction();

    const [res] = await con.query<ResultSetHeader>(
      `DELETE FROM ${likesTable} WHERE user_id=? AND tweet_id=?`,
      [user_id, tweet_id]
    );

    if (res.affectedRows === 0) {
      await con.rollback();
      return;
    }

    await con.execute(`UPDATE ${tweetsTable} SET likes=likes-1 WHERE id=?`, [
      tweet_id
    ]);
    await con.commit();
  } catch (err: any) {
    await con?.rollback();
    throw err;
  } finally {
    con?.release();
  }
}

export async function removeRetweet(user_id: number, tweet_id: string) {
  let con = null;
  try {
    con = await pool.getConnection();
    await con.beginTransaction();

    const [res] = await con.query<ResultSetHeader>(
      `DELETE FROM ${retweetsTable} WHERE user_id=? AND tweet_id=?`,
      [user_id, tweet_id]
    );

    if (res.affectedRows === 0) {
      await con.rollback();
      return;
    }

    await con.execute(
      `UPDATE ${tweetsTable} SET retweets=retweets-1 WHERE id=?`,
      [tweet_id]
    );
    await con.commit();
  } catch (err: any) {
    await con?.rollback();
    throw err;
  } finally {
    con?.release();
  }
}

type Likes = RowDataPacket & {
  tweet_id: string;
};

export async function getLikes(user_id: number) {
  const [result] = await pool.query<Likes[]>(
    `SELECT tweet_id FROM ${likesTable} WHERE user_id=?`,
    [user_id]
  );
  if (result.length === 0) return [];
  return result.map((x) => x.tweet_id);
}

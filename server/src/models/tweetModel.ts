import crypto from 'crypto';

import {
  commentsTable,
  likesTable,
  pool,
  retweetsTable,
  tweetsTable,
  userTable
} from '../mysql';

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
  type: 'TEXT' | 'COMMENT';
}

const INSERT_TWEET = `INSERT INTO ${tweetsTable}(id, content, author, type) VALUES(?,?,?,?)`;
const SELECT_TOP_10_TWEETS = `SELECT t.*, u.pfp, u.username, u.displayname FROM ${tweetsTable} as t, ${userTable} as u WHERE t.author=u.id ORDER BY t.created_at DESC LIMIT 10;`;
const VERIFY_OWNERSHIP = `SELECT author FROM ${tweetsTable} WHERE id=?`;

function generateId() {
  return crypto.randomUUID().replace(/-/g, '');
}

export async function createTweet(author: number, text: string) {
  const tweet_id = generateId();

  await pool.execute(INSERT_TWEET, [tweet_id, text, author, 'TEXT']);

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
    `SELECT r.*, u.username, u.displayname, u.pfp from (SELECT t.* FROM ${tweetsTable} AS t WHERE author=? UNION SELECT t.* FROM ${tweetsTable} AS t WHERE t.id IN(SELECT tweet_id FROM ${retweetsTable} WHERE user_id=?)) AS r, ${userTable} AS u WHERE r.author=u.id ORDER BY r.created_at desc`,
    [user_id, user_id]
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
    await con.execute(
      `INSERT INTO ${retweetsTable}(user_id, tweet_id) VALUES(?,?)`,
      [user_id, tweet_id]
    );

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

type Retweet = Likes & {
  created_at: string;
};

export async function getRetweets(user_id: number) {
  const [result] = await pool.query<Retweet[]>(
    `SELECT tweet_id from ${retweetsTable} WHERE user_id=?`,
    [user_id]
  );
  if (result.length === 0) return [];
  return result.map((x) => x.tweet_id);
}

export async function getComments(tweet_id: string) {
  const [comments] = await pool.query<Tweet[]>(
    `SELECT r.*, u.username, u.displayname, u.pfp FROM (SELECT t.* FROM ${tweetsTable} WHERE t.id IN (SELECT comment_id FROM ${commentsTable} WHERE replying_to=?)) AS r, ${userTable} as u WHERE r.author=u.id ORDER BY r.created_at DESC LIMIT 50`,
    [tweet_id]
  );
  if (comments.length === 0) return [];
  return comments;
}

export async function addComment(
  tweet_id: string,
  author: number,
  text: string
) {
  const newId = generateId();
  let con = null;
  try {
    con = await pool.getConnection();
    await con.beginTransaction();
    await con.execute(INSERT_TWEET, [newId, text, author, 'COMMENT']);

    await con.execute(`INSERT INTO ${commentsTable} VALUES(?,?,?)`, [
      tweet_id,
      newId,
      author
    ]);

    await con.execute(
      `UPDATE ${tweetsTable} SET comments=comments+1 WHERE id=?`,
      [tweet_id]
    );

    await con.commit();
  } catch (err: any) {
    await con?.rollback();
    console.error(err);
  } finally {
    con?.release();
  }
}

type Comments = (RowDataPacket & {
  comment_id: string;
  replying_to: string;
})[];

export async function removeComment(comment_id: string, author: number) {
  let con = null;
  try {
    con = await pool.getConnection();
    await con.beginTransaction();
    const [tweets] = await con.query<Tweet[]>(
      `SELECT author FROM ${tweetsTable} WHERE id=?`,
      comment_id
    );

    if (tweets.length === 0) {
      return {
        error: 'comment does not exists'
      };
    }

    const tweet = tweets[0];
    if (tweet.author !== author) {
      return {
        error: 'not author'
      };
    }
    await con.execute(`DELETE FROM ${tweetsTable} WHERE id=?`, [comment_id]);
    await con.execute(`DELETE FROM ${commentsTable} WHERE comment_id=?`, [
      comment_id
    ]);

    await con.commit();
  } catch (err: any) {
    await con?.rollback();
    console.error(err);
  } finally {
    con?.release();
  }
}

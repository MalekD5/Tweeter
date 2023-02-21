import { RowDataPacket } from 'mysql2';
import { pool, tweetsTable } from '../MySQLConnection';
import crypto from 'crypto';

interface Tweet extends RowDataPacket {
  tweetid: string;
  tweetedBy: number;
  tweetText: string;
  created_at: Date;
}

const INSERT_TWEET = `INSERT INTO ${tweetsTable}(tweetId, tweetText, tweetedBy) VALUES(?,?,?)`;
const SELECT_TOP_10_TWEETS = `SELECT * FROM ${tweetsTable} ORDER BY created_at DESC LIMIT 10;`;
const EDIT_TWEET = `UPDATE ${tweetsTable} SET tweetText=? WHERE tweetId=?`;
const VERIFY_OWNERSHIP = `SELECT tweetedBy FROM ${tweetsTable} WHERE tweetid=?`;

export async function createTweet(tweetedBy: number, tweetText: string) {
  const tweetId = crypto.randomUUID().replace(/-/g, '');

  await pool.promise().execute(INSERT_TWEET, [tweetId, tweetText, tweetedBy]);

  return tweetId;
}

export async function retrieveTopTweets() {
  const [tweets] = await pool.promise().query<Tweet[]>(SELECT_TOP_10_TWEETS);
  return tweets;
}

export async function editTweet(tweetId: string, tweetText: string) {
  await pool.promise().query(EDIT_TWEET, [tweetText, tweetId]);
}

export async function isOwnerOfTweet(tweetId: string, userId: number) {
  const [tweets] = await pool
    .promise()
    .query<Tweet[]>(VERIFY_OWNERSHIP, [tweetId]);
  if (tweets.length === 0) return false;

  const tweet = tweets[0];
  return tweet.tweetedBy === userId;
}

export type { Tweet };

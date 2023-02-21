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

export async function createTweet(
  tweetedBy: number,
  tweetText: string
): Promise<string> {
  const tweetId = crypto.randomUUID().replace(/-/g, '');

  await pool.promise().execute(INSERT_TWEET, [tweetId, tweetText, tweetedBy]);

  return tweetId;
}

export async function retrieveTopTweets(): Promise<Tweet[]> {
  const [tweets] = await pool.promise().query<Tweet[]>(SELECT_TOP_10_TWEETS);
  return tweets;
}

export type { Tweet };

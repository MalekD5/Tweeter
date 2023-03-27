import type { RowDataPacket } from 'mysql2';
import {
  pool,
  bookmarkTable,
  authTable,
  tweetsTable
} from '../MySQLConnection';

interface BookmarkResponse extends RowDataPacket {
  user_id: string;
  tweet: string;
}

type BookmarkedTweets = {
  text: string;
  op: string;
  opPfp: string;
  date: string;
};

export async function getBookmarks(user_id: string, offset = 0) {
  const query = await pool
    .promise()
    .query<BookmarkResponse[]>(
      `SELECT * from ${bookmarkTable} WHERE user_id=?`,
      [user_id]
    );
  const [bookmarks] = query;

  if (bookmarks.length === 0) return [];

  const selectedTweets: string[] = [];
  for (let i = offset; i < bookmarks.length; i++) {
    if (selectedTweets.length === 2) break;
    // tweet id
    selectedTweets.push(`'${bookmarks[i].tweet}'`);
  }
  if (selectedTweets.length === 0) return [];
  const tweet_ids = selectedTweets.join(',');
  const tweets_query = await pool.promise().query<
    (BookmarkResponse & {
      tweetid: string;
      tweetText: string;
      created_at: string;
      pfp: string;
      username: string;
    })[]
  >(`SELECT twts.tweetid, twts.tweetText, twts.tweetedBy, twts.created_at, auth.pfp, auth.username from ${authTable} as auth, ${tweetsTable} as twts WHERE twts.tweetedBy=auth.id AND tweetid in (${tweet_ids}) LIMIT 2`, [offset]);

  const [tweets] = tweets_query;
  console.log(tweets);

  if (tweets.length === 0) return [];
  return tweets.map((x) => ({
    text: x.tweetText,
    op: x.username,
    opPfp: x.pfp,
    date: x.created_at
  }));
}

export async function bookmark(user_id: string, tweetId: string) {}

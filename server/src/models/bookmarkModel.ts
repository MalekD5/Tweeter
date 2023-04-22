import { pool, bookmarkTable, tweetsTable, userTable } from '@/mysql';
import { transformTweets } from '@/utils/ModelUtils';

import type { RowDataPacket } from 'mysql2';
import type { Tweet } from './tweetModel';

interface BookmarkRowData extends RowDataPacket {
  user_id: string;
  tweet: string;
}

export async function getBookmarks(user_id: number, offset = 0) {
  const [bookmarks] = await pool.query<BookmarkRowData[]>(
    `SELECT * from ${bookmarkTable} WHERE user_id=? LIMIT 10 OFFSET ${offset}`,
    [user_id]
  );
  if (bookmarks.length === 0) return [];

  const selectedTweets = selectTweets(bookmarks, offset);

  if (selectedTweets.length === 0) return [];

  const tweet_ids = selectedTweets.join(',');

  const [tweets] = await pool.query<Tweet[]>(
    `SELECT twts.*, user.pfp, user.username, user.displayname from ${userTable} as user, ${tweetsTable} as twts WHERE author=user.id AND twts.id in (${tweet_ids}) ORDER BY created_at DESC LIMIT 10`
  );
  if (tweets.length === 0) return [];

  return tweets;
}

export async function getBookmarksId(user_id: number) {
  const [bookmarks] = await pool.query<BookmarkRowData[]>(
    `SELECT tweet from ${bookmarkTable} WHERE user_id=? LIMIT 20`,
    [user_id]
  );
  if (bookmarks.length === 0) return [];
  const data = bookmarks.map((x) => x.tweet);
  return data;
}

export async function bookmark(user_id: number, tweetId: string) {
  await pool.query(`INSERT INTO ${bookmarkTable} VALUES(?,?)`, [
    user_id,
    tweetId
  ]);
}

export async function unbookmark(user_id: number, tweetId: string) {
  await pool.query(
    `DELETE FROM ${bookmarkTable} WHERE user_id=? AND tweet=? `,
    [user_id, tweetId]
  );
}

function selectTweets(bookmarks: BookmarkRowData[], offset: number) {
  const selectedTweets = [];
  for (let i = offset; i < bookmarks.length; i++) {
    selectedTweets.push(`'${bookmarks[i].tweet}'`);
  }
  return selectedTweets;
}

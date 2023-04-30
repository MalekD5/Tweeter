import { pool, bookmarkTable } from '@/mysql';

import type { RowDataPacket } from 'mysql2';
import { DatabaseTweet } from './model';
import { transformTweets } from '@/utils/ModelUtils';
import type { Tweet } from '@common/types/Main';

export interface BookmarkRowData extends RowDataPacket {
  user_id: string;
  tweet: string;
}

export async function getBookmarks(user_id: number, offset = 0) {
  const [tweets] = await pool.query<DatabaseTweet>(
    `
SELECT
    t.id,
    t.author,
    t.content,
    t.created_at,
    t.likes,
    t.retweets,
    t.comments,
    u.username,
    u.displayname,
    u.pfp,
    1 'isBookmarked',
    IF(r.tweet_id IS NULL, 0, 1) 'isRetweeted',
    IF(l.tweet_id IS NULL, 0, 1) 'isLiked'
FROM
    tweets t
        LEFT JOIN
    likes l ON t.id = l.tweet_id AND l.user_id=?
        LEFT JOIN
    retweets r ON t.id = r.tweet_id AND r.user_id=?
        LEFT JOIN
    bookmarks b ON t.id = b.tweet_id AND b.user_id=?
	INNER JOIN
    users u ON u.id = t.author
WHERE t.id=b.tweet_id ORDER BY t.created_at DESC LIMIT 10 OFFSET ${offset};`,
    [user_id, user_id, user_id]
  );
  if (tweets.length === 0) return [];

  return transformTweets(tweets as Tweet[], user_id);
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

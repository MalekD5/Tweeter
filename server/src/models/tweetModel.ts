import { pool } from '@/mysql';
import type { Tweet } from '@common/types/Main';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { generateId, transformTweets } from '@/utils/ModelUtils';

type Comment = {
  replying_to: string;
  comment_id: string;
  author: number;
};

type DatabaseTweet = (RowDataPacket & Omit<Tweet, 'isAuthor'>)[];
type DatabaseComment = (RowDataPacket & Comment)[];

export async function createTweet(author: number, text: string) {
  const tweet_id = generateId();

  await pool.execute(
    `INSERT INTO tweets(id, content, author, type) VALUES(?,?,?,?)`,
    [tweet_id, text, author, 'TEXT']
  );

  return tweet_id;
}

export async function getTweet(tweetId: string, userId: number) {
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
    IF(b.tweet_id IS NULL, 0, 1) 'isBookmarked',
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
WHERE t.id=? ORDER BY t.created_at DESC;`,
    [userId, userId, userId, tweetId]
  );
  if (tweets.length === 0) return {};
  const tweet = tweets[0];

  return transformTweets([tweet as Tweet], userId)[0];
}

export async function retrieveTopTweets(userId: number, offset: number = 0) {
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
    IF(b.tweet_id IS NULL, 0, 1) 'isBookmarked',
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
 WHERE type='TEXT' ORDER BY t.created_at DESC LIMIT 10 OFFSET ${offset};`,
    [userId, userId, userId]
  );
  return transformTweets(tweets as Tweet[], userId);
}

export async function isOwnerOfTweet(tweet_id: string, user_id: number) {
  const [tweets] = await pool.query<DatabaseTweet>(
    `SELECT author FROM tweets WHERE id=?`,
    [tweet_id]
  );
  if (tweets.length === 0) return false;

  const tweet = tweets[0];
  return tweet.author === user_id;
}

export async function getUserTweets(userId: number) {
  const [tweets] = await pool.query<DatabaseTweet>(
    `SELECT 
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
    IF(b.tweet_id IS NULL, 0, 1) 'isBookmarked',
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
WHERE (t.author=? OR t.id=r.tweet_id) AND t.type='TEXT' ORDER BY t.created_at DESC;`,
    [userId, userId, userId, userId]
  );

  if (tweets.length === 0) return [];
  return transformTweets(tweets as Tweet[], userId);
}

export async function deleteTweet(user_id: number, tweet_id: string) {
  const isOwner = await isOwnerOfTweet(tweet_id, user_id);
  if (!isOwner) {
    return false;
  }

  let con = null;
  try {
    con = await pool.getConnection();
    await con.beginTransaction();

    const [tweets] = await con.query<DatabaseTweet>(
      `
    SELECT type from tweets WHERE id=?
    `,
      [tweet_id]
    );
    if (tweets.length === 0) return false;
    const [tweet] = tweets;
    if (tweet.type === 'COMMENT') {
      const [[parentTweet]] = await con.query<DatabaseComment>(
        `SELECT replying_to FROM comments WHERE comment_id=?`,
        [tweet_id]
      );

      await con.execute('UPDATE tweets SET comments=comments-1 WHERE id=?', [
        parentTweet.replying_to
      ]);

      await con.execute(`DELETE FROM comments WHERE comment_id=?`, [tweet_id]);
    }
    await con.execute(`DELETE FROM tweets WHERE id=?`, [tweet_id]);
    await con.commit();
  } catch (err: any) {
    console.log(err);
    await con?.rollback();
  } finally {
    con?.release();
  }

  return true;
}

export async function addLike(user_id: number, tweet_id: string) {
  let con = null;
  try {
    con = await pool.getConnection();
    await con.beginTransaction();

    await con.execute(`INSERT INTO likes VALUES(?,?)`, [user_id, tweet_id]);

    await con.execute(`UPDATE tweets SET likes=likes+1 WHERE id=?`, [tweet_id]);
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
    await con.execute(`INSERT INTO retweets(user_id, tweet_id) VALUES(?,?)`, [
      user_id,
      tweet_id
    ]);

    await con.execute(`UPDATE tweets SET retweets=retweets+1 WHERE id=?`, [
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

export async function removeLike(user_id: number, tweet_id: string) {
  let con = null;
  try {
    con = await pool.getConnection();
    await con.beginTransaction();

    const [res] = await con.query<ResultSetHeader>(
      `DELETE FROM likes WHERE user_id=? AND tweet_id=?`,
      [user_id, tweet_id]
    );

    if (res.affectedRows === 0) {
      await con.rollback();
      return;
    }

    await con.execute(`UPDATE tweets SET likes=likes-1 WHERE id=?`, [tweet_id]);
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
      `DELETE FROM retweets WHERE user_id=? AND tweet_id=?`,
      [user_id, tweet_id]
    );

    if (res.affectedRows === 0) {
      await con.rollback();
      return;
    }

    await con.execute(`UPDATE tweets SET retweets=retweets-1 WHERE id=?`, [
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

type Likes = RowDataPacket & {
  tweet_id: string;
};

export async function getLikes(user_id: number) {
  const [result] = await pool.query<Likes[]>(
    `SELECT tweet_id FROM likes WHERE user_id=?`,
    [user_id]
  );
  if (result.length === 0) return [];
  return result.map((x) => x.tweet_id);
}

export type Retweet = Likes & {
  created_at: string;
};

export async function getRetweets(user_id: number) {
  const [result] = await pool.query<Retweet[]>(
    `SELECT tweet_id,created_at from retweets WHERE user_id=?`,
    [user_id]
  );
  if (result.length === 0) return [];
  return result;
}

export async function getCommentsV2(tweetId: string, userId: number) {
  const [comments] = await pool.query<DatabaseTweet>(
    `SELECT 
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
    IF(b.tweet_id IS NULL, 0, 1) 'isBookmarked',
    IF(r.tweet_id IS NULL, 0, 1) 'isRetweeted',
    IF(l.tweet_id IS NULL, 0, 1) 'isLiked'
FROM
    tweets t
        LEFT JOIN
    likes l ON t.id = l.tweet_id
        LEFT JOIN
    retweets r ON t.id = r.tweet_id
        LEFT JOIN
    bookmarks b ON t.id = b.tweet_id 
        INNER JOIN
    comments c ON (c.comment_id = t.id
        OR c.comment_id = r.tweet_id)
        AND c.replying_to = ?
	INNER JOIN
    users u ON u.id = t.author
ORDER BY t.created_at DESC;`,
    [tweetId]
  );
  if (comments.length === 0) return [];

  return transformTweets(comments as Tweet[], userId);
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
    await con.execute(
      `INSERT INTO tweets(id, content, author, type) VALUES(?,?,?,?)`,
      [newId, text, author, 'COMMENT']
    );

    await con.execute(`INSERT INTO comments VALUES(?,?,?)`, [
      tweet_id,
      newId,
      author
    ]);

    await con.execute(`UPDATE tweets SET comments=comments+1 WHERE id=?`, [
      tweet_id
    ]);

    await con.commit();
  } catch (err: any) {
    await con?.rollback();
    console.error(err);
  } finally {
    con?.release();
  }
}

// WIP
// The point of this function is to get the parent tweet of any comment no matter how deeply nested it is (recursive function sets a limit of 1000 iterations)
export async function getCommentParent(commentId: string) {
  const query = `with recursive cte as (select replying_to, comment_id from comments where comment_id=? union all select comments.replying_to, comments.comment_id from cte join comments on comments.comment_id=cte.replying_to) select replying_to from cte;`;
}

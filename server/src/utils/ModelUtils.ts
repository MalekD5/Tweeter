import { type Tweet } from '@/models/tweetModel';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { type RowDataPacket } from 'mysql2';

export function exists(response: RowDataPacket[] | undefined) {
  return response?.length !== 0;
}

export function transformTweets(tweets: Tweet[]) {
  return tweets.map((t) => {
    const { content, created_at, pfp, ...rest } = t;
    const pfp_url = pfp ? `http://localhost:5000/images/${pfp}` : undefined;
    return {
      pfp: pfp_url,
      text: content,
      created_at: formatDistanceToNow(
        parseISO(new Date(t.created_at).toISOString())
      ),
      ...rest
    };
  });
}

type TweetsArray = Tweet[];

export function transformData(
  user_id: number,
  tweets: TweetsArray,
  bookmarks: string[] | boolean,
  likes: string[]
) {
  return tweets.map(({ pfp, content, created_at, ...x }) => ({
    ...x,
    text: content,
    pfp: pfp ? `http://localhost:5000/images/${pfp}` : undefined,
    created_at: formatDistanceToNow(
      parseISO(new Date(created_at).toISOString())
    ),
    isAuthor: x.author === user_id,
    isLiked: likes.includes(x.id),
    isBookmarked:
      typeof bookmarks === 'boolean' ? bookmarks : bookmarks.includes(x.id),
    isRetweeted: false
  }));
}

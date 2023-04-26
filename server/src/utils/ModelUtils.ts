import { formatDistanceToNow, parseISO } from 'date-fns';
import type { RowDataPacket } from 'mysql2';
import type { Retweet, Tweet } from '@/models/tweetModel';

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

export function transformDataForUser(
  user_id: number,
  tweets: TweetsArray,
  bookmarks: string[] | boolean,
  likes: string[],
  retweets?: Retweet[]
) {
  let order = tweets;

  if (retweets) {
    order = tweets
      .map((data) => {
        const retweetData = retweets?.find((x) => x.tweet_id === data.id);
        const sort_date =
          (retweetData?.created_at && new Date(retweetData.created_at)) ||
          new Date(data.created_at);

        return {
          ...data,
          sort_date
        };
      })
      .sort((a, b) => {
        return b.sort_date.getTime() - a.sort_date.getTime();
      });
  }

  return transformData(
    user_id,
    order,
    bookmarks,
    likes,
    retweets?.map((x) => x.tweet_id)
  );
}

export function transformData(
  user_id: number,
  tweets: TweetsArray,
  bookmarks: string[] | boolean,
  likes: string[],
  retweets?: string[]
) {
  return tweets.map(({ pfp, content, created_at, sort_date, ...x }) => ({
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
    isRetweeted: !!retweets ? retweets.includes(x.id) : false
  }));
}

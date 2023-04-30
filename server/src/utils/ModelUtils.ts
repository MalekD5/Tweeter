import crypto from 'crypto';

import type { Tweet } from '@common/types/Main';

export function transformTweets(tweets: Tweet[], userId: number) {
  return tweets.map(
    ({ isBookmarked, isLiked, isRetweeted, pfp, ...tweet }) => ({
      ...tweet,
      pfp: pfp ? `http://localhost:5000/images/${pfp}` : undefined,
      isAuthor: userId === tweet.author,
      isBookmarked: Boolean(isBookmarked),
      isLiked: Boolean(isLiked),
      isRetweeted: Boolean(isRetweeted)
    })
  ) as Tweet[];
}

export function generateId() {
  return crypto.randomUUID().replace(/-/g, '');
}

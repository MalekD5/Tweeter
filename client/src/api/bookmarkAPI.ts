import { LatestTweetsType } from '@common/types/Endpoints';
import { instanceWithRefresh, prepareToken } from './api';

export async function getBookmarks() {
  const config = prepareToken();
  const res = await instanceWithRefresh.get<LatestTweetsType[]>(
    '/bookmarks',
    config
  );
  return res?.data;
}

export async function BookmarkTweet(tweet_id: string) {
  const config = prepareToken();
  await instanceWithRefresh.post('/bookmarks', { tweet_id }, config);
}

export async function UnBookmarkTweet(tweet_id: string) {
  const config = prepareToken();
  await instanceWithRefresh.delete('/bookmarks', {
    ...config,
    params: {
      id: tweet_id
    }
  });
}

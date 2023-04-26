import { instanceWithRefresh, prepareToken } from './api';
import {
  GetLatestTweetsResponse,
  LatestTweetsType
} from '@common/types/Endpoints';

export async function getExploreTweets() {
  const config = prepareToken();
  const req = await instanceWithRefresh.get<GetLatestTweetsResponse>(
    '/tweet',
    config
  );
  return req?.data;
}

export async function LikeTweet(tweet_id: string) {
  const config = prepareToken();
  const req = await instanceWithRefresh.post(
    '/tweet/like',
    { tweet_id },
    config
  );
  return req.status;
}

export async function UnlikeTweet(tweet_id: string) {
  const config = prepareToken();
  const req = await instanceWithRefresh.delete(`/tweet/like/`, {
    ...config,
    params: {
      id: tweet_id
    }
  });
  return req.status;
}

export async function getUserTweets() {
  const config = prepareToken();
  const req = await instanceWithRefresh.get<LatestTweetsType[]>(
    '/tweet/user',
    config
  );
  return req?.data;
}

export async function DeleteTweet(tweet_id: string) {
  const config = prepareToken();
  await instanceWithRefresh.delete('/tweet', {
    ...config,
    params: {
      id: tweet_id
    }
  });
}

export async function createTweet(text: string) {
  const config = prepareToken();
  const req = await instanceWithRefresh.post<LatestTweetsType>(
    '/tweet',
    { text },
    config
  );
  return req?.data;
}

export async function createRetweet(tweet_id: string) {
  const config = prepareToken();
  await instanceWithRefresh.post('/retweet', { tweet_id }, config);
}

export async function removeRetweet(tweet_id: string) {
  const config = prepareToken();
  await instanceWithRefresh.delete('/retweet', {
    ...config,
    params: { id: tweet_id }
  });
}

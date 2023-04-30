import type { Tweet } from '@common/types/Main';
import { instanceWithRefresh, prepareToken } from './api';

export async function getExploreTweets() {
  const config = prepareToken();
  const req = await instanceWithRefresh.get<Tweet[]>('/tweet/explore', config);
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
  const req = await instanceWithRefresh.get<Tweet[]>('/tweet/user', config);
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
  const req = await instanceWithRefresh.post('/tweet', { text }, config);
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

export async function getComments(tweet_id: string) {
  const config = prepareToken();
  const res = await instanceWithRefresh.get<Tweet[]>(
    `/comment/${tweet_id}`,
    config
  );
  return res?.data;
}

export async function getId(tweet_id: string) {
  const config = prepareToken();
  const res = await instanceWithRefresh.get<Tweet>(
    `/tweet/id/${tweet_id}`,
    config
  );
  return res?.data;
}

export async function addComment({
  replying_to,
  text
}: {
  replying_to: string;
  text: string;
}) {
  const config = prepareToken();
  await instanceWithRefresh.post(
    '/comment',
    {
      replying_to,
      comment: text
    },
    config
  );
}

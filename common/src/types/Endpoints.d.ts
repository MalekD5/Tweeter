import { TweetType } from './Main';

export type LatestTweetsType = TweetType & {
  isAuthor: boolean;
  isBookmarked: boolean;
  isLiked: boolean;
  isRetweeted: boolean;
};

type Token = {
  token: string;
};

export type GetLatestTweetsResponse = LatestTweetsType[];
export type GetRefreshTokenResponse = Token;
export type GetBookmarksResponse = TweetType[];
export type GetUserTweetsResponse = TweetType[];
export type GetUserInfoResponse = {
  bio: string;
  created_at: string;
};

export type PostRegisterResponse = Token;
export type PostUploadAvatarResponse = {
  name: string;
};
export type PostLoginResponse = Token & {
  username: string;
  displayname: string;
  pfp: string;
};
export type PostCreateTweetResponse = {
  postId: string;
};

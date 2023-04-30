export type TweetType = {
  id: string;
  author: number;
  text: string;
  created_at: string;
  likes: number;
  comments: number;
  retweets: number;
  username: string;
  displayname: string;
  pfp?: string;
};

export type Tweet = {
  id: string;
  author: number;
  content: string;
  created_at: string;
  likes: number;
  comments: number;
  retweets: number;
  username: string;
  displayname: string;
  type: 'TEXT' | 'COMMENT';
  pfp?: string;
  isBookmarked: boolean;
  isLiked: boolean;
  isRetweeted: boolean;
  isAuthor: boolean;
};

export type UserData = {
  id: number;
  username: string;
  displayname: string;
  created_at: string;
};

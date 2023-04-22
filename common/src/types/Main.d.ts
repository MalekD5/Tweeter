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

export type UserData = {
  id: number;
  username: string;
  displayname: string;
  created_at: string;
};

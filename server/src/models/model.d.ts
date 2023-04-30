import { RowDataPacket } from 'mysql2';
import { Tweet } from '@common/types/Main';

type Comment = {
  replying_to: string;
  comment_id: string;
  author: number;
};

/**
 * This represents retweets, likes, and bookmarks tables
 */
type ActionReference = {
  tweet_id: string;
  user_id: number;
};

type Retweet = ActionReference & {
  created_at: string;
};

type DatabaseTweet = (RowDataPacket & Omit<Tweet, 'isAuthor'>)[];
type DatabaseComment = (RowDataPacket & Comment)[];
type DatabaseActionReference = (RowDataPacket & ActionReference)[];
type DatabaseRetweet = (RowDataPacket & Retweet)[];

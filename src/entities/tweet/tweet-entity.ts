import { TweetPoll } from "./tweet-poll";

export class TweetEntity {
  id: string;
  type: "image" | "video" | "user" | "poll";
  url: string;
  tweetId: string;

  constructor(id: string, type: "image" | "video" | "user" | "poll", url: string, tweetId: string) {
    this.id = id;
    this.type = type;
    this.url = url;
    this.tweetId = tweetId;
  }

  isPoll(): this is TweetPoll {
    return this.type === "poll";
  }
}

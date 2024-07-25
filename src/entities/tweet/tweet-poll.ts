import { TweetEntity } from "./tweet-entity";

export class TweetPoll extends TweetEntity {
  question: string;
  options: string[];
  endsAt: Date;

  constructor(
    id: string,
    url: string,
    tweetId: string,
    question: string,
    options: string[],
    endsAt: Date,
  ) {
    super(id, "poll", url, tweetId);
    this.question = question;
    this.options = options;
    this.endsAt = endsAt;
  }

  hasEnded(): boolean {
    return this.endsAt < new Date();
  }

  override isPoll(): this is TweetPoll {
    return true;
  }
}

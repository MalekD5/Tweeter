import { formatDistanceToNowStrict } from "date-fns";
import { User } from "../user";
import { TweetEntity } from "./tweet-entity";

export class Tweet {
  id: string;
  text: string;
  createdAt: Date;

  owner: User;

  entities: TweetEntity[];

  constructor(owner: User, id: string, text: string, createdAt: Date, entities: TweetEntity[]) {
    this.owner = owner;
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
    this.entities = entities;
  }

  get createdAtFormatted() {
    return formatDistanceToNowStrict(this.createdAt);
  }

  hasEntities(): boolean {
    return this.entities.length > 0;
  }
}

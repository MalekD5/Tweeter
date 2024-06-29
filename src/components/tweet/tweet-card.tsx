import type { DBTweet, DBUser } from "@/lib/db/schemas";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";

type User = Pick<DBUser, "name" | "username" | "image">;

type TweetCardProps = {
  tweet: DBTweet;
  user: User;
};

export default function TweetCard({ tweet, user }: TweetCardProps) {
  return (
    <div className="min-h-0 w-full border-b border-b-zinc-800">
      <article className="flex gap-2 px-4 py-3">
        <div>
          <img src={user.image!} alt={user.name!} width={48} height={48} className="rounded-full" />
        </div>
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-between">
            <div className="flex w-full items-center gap-1 text-sm">
              <p className="font-bold">{user.name!}</p>
              <p className="text-muted-foreground">@{user.username!}</p>
              <p className="text-muted-foreground">{formatDistanceToNow(tweet.createdAt)}</p>
            </div>
            <BsThreeDots />
          </div>
          <p className="max-w-full whitespace-normal text-wrap break-words text-sm">{tweet.text}</p>
        </div>
      </article>
    </div>
  );
}

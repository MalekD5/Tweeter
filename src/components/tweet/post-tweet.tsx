import { getSession } from "@/actions/auth";
import { Textarea } from "../ui/textarea";
import PostTweetForm from "./client/post-tweet-form";

export default async function PostTweet() {
  const session = await getSession();
  if (!session.id) return <div>Loading...</div>;

  return (
    <div className="min-h-0 w-full border-b border-b-zinc-800">
      <article className="flex gap-2 px-4 py-3">
        <div>
          <img
            src={session.image}
            alt={session.displayName}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div className="flex h-auto w-full flex-col overflow-hidden text-wrap break-words">
          <PostTweetForm />
        </div>
      </article>
    </div>
  );
}

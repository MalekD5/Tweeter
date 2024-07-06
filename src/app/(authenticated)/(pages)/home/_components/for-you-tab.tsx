import PostTweet from "@/components/tweet/post-tweet";
import { TabsContent } from "@/components/ui/tabs";
import FyInfiniteScrolling from "./fy-infinite-scrolling";

export default function FyTab() {
  return (
    <TabsContent value="fy">
      <div className="flex flex-col">
        <PostTweet />
        <FyInfiniteScrolling />
      </div>
    </TabsContent>
  );
}

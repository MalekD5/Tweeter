import { Tabs } from "@/components/ui/tabs";
import { List as RadixTab } from "@radix-ui/react-tabs";
import TriggerItem from "./_components/trigger-item";
import TriggerContainer from "./_components/trigger-container";
import { redirect } from "next/navigation";
import FyTab from "./_components/for-you-tab";
import FollowingTab from "./_components/following-tab";
import { getSession } from "@/actions/auth";

export default async function Home() {
  const user = await getSession();

  if (!user.id) {
    return redirect("/");
  }

  if (!user.username) {
    return redirect("/complete-signup");
  }

  return (
    <div className="grid-row-1 grid grid-cols-2">
      <div className="col-start-1 col-end-2 min-h-screen border-r border-r-zinc-800">
        <Tabs defaultValue="fy" className="w-full">
          <RadixTab className="grid-row-1 text-md grid grid-cols-2 border-b border-b-zinc-800 bg-background py-5">
            <TriggerContainer>
              <TriggerItem value="fy">For you</TriggerItem>
            </TriggerContainer>
            <TriggerContainer>
              <TriggerItem value="following">Following</TriggerItem>
            </TriggerContainer>
          </RadixTab>
          <FyTab />
          <FollowingTab />
        </Tabs>
      </div>
    </div>
  );
}

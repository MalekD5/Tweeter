import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import FyTab from './_components/for-you-tab';
import FollowingTab from './_components/following-tab';

export default async function Home() {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }

  return (
    <div className="grid-row-1 grid grid-cols-2">
      <div className="col-start-1 col-end-2">
        <Tabs defaultValue="fy" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="fy">For you</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <FyTab />
          <FollowingTab />
        </Tabs>
      </div>
    </div>
  );
}

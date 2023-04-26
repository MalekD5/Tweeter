import { useEffect, useContext } from 'react';
import { SidebarContext } from '@/context/SidebarContext';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { TweetCard, Button } from '@/components';
import { RxCalendar } from 'react-icons/rx';
import { useUserStore } from '@/utils/storage';
import { useQuery } from 'react-query';
import { getUserTweets } from '@/api/tweetAPI';
import { queryClient } from '@/api/api';
import { getProfileData } from '@/api/authAPI';

function Profile() {
  const { setValue } = useContext(SidebarContext);
  const { user } = useUserStore();
  const { data: profile } = useQuery({
    queryFn: getProfileData,
    queryKey: ['Profile']
  });

  const { data: tweets } = useQuery({
    queryFn: getUserTweets,
    queryKey: ['User'],
    onSuccess: (data) => {
      data.map((tweet) => queryClient.setQueryData(['User', tweet.id], tweet));
    }
  });

  useEffect(() => {
    setValue('Profile');
  }, []);

  return (
    <div className='w-full flex'>
      <div
        className='w-full lg:w-1/2 border-r border-r-bordergray border-l 
          border-l-bordergray min-h-[100vh] mb-16 md:mb-0'
      >
        <div className='px-4 flex backdrop-blur-lg items-center w-full h-14 sticky top-0 '>
          <div className='flex gap-5 w-fit items-center'>
            <Link
              to='/explore'
              className='hover:bg-bordergray p-2 rounded-full'
            >
              <AiOutlineArrowLeft className='text-2xl' />
            </Link>
            <div>
              <p className='text-xl font-Bold'>{user?.username}</p>
              <p className='text-sm text-textgray'>{tweets?.length} tweets</p>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col'>
          <div className='w-full h-32 bg-gray-600'></div>
          <div className='flex justify-between'>
            <img
              crossOrigin='anonymous'
              src={user?.pfp || 'defaultpfp.png'}
              className='-mt-10 ml-5 h-32 w-32 rounded-full border-4 border-black'
            />
            <Link to='/settings' className='mt-2 mr-1'>
              <Button color='outline-default'>Edit Profile</Button>
            </Link>
          </div>
          <div className='flex flex-col ml-5 py-5'>
            <span className='text-2xl font-bold'>{user?.displayname}</span>
            <span className='text-sm text-textgray'>@{user?.username}</span>
            <span className='mt-4 text-sm font-light'>{profile?.bio}</span>
            <div className='flex gap-2 items-center text-sm mt-3'>
              <RxCalendar className='m-0' />
              <span className='text-textgray'>
                Joined {profile?.created_at}
              </span>
            </div>
          </div>
        </div>
        {tweets?.map((tweet) => (
          <TweetCard showRetweets key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

export default Profile;

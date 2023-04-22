import { queryClient } from '@/api/api';
import { getBookmarks } from '@/api/bookmarkAPI';
import { TweetCard } from '@/components';
import { SidebarContext } from '@/context/SidebarContext';
import { useContext, useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

function Bookmarks() {
  const { data, isSuccess, isRefetching, isFetching } = useQuery({
    queryFn: getBookmarks,
    queryKey: ['Bookmark'],
    onSuccess: (data) => {
      data.forEach((tweet) =>
        queryClient.setQueryData(['Bookmark', tweet.id], tweet)
      );
    }
  });

  const { setValue } = useContext(SidebarContext);

  useEffect(() => {
    setValue('Bookmarks');
  }, []);

  if (isFetching && !isRefetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='w-1/2 flex flex-col min-h-[100vh] border border-bordergray'>
        <div className='px-4 flex backdrop-blur-lg items-center w-full h-14 sticky top-0 '>
          <div className='flex gap-5 w-fit items-center'>
            <Link
              to='/explore'
              className='hover:bg-bordergray p-2 rounded-full'
            >
              <AiOutlineArrowLeft className='text-2xl' />
            </Link>
            <div>
              <p className='text-xl font-Bold'>Bookmarks</p>
            </div>
          </div>
        </div>
        {data?.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
        {isSuccess && !isRefetching && data?.length === 0 && (
          <h3 className='w-full text-xl font-bold mt-20 text-center'>
            You don't have any bookmarks
          </h3>
        )}
      </div>
    </>
  );
}

export default Bookmarks;

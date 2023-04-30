import { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { ElementType } from '../Dropdown';
import TweetOptions from './TweetOptions';
import TweetButtons from './TweetButtons';
import type { Tweet } from '@common/types/Main';

type TweetViewProps = {
  tweet: Tweet;
};

function TweetView({ tweet }: TweetViewProps) {
  const [open, setOpen] = useState(false);
  const [reference, setReference] = useState<ElementType>(null);

  const analyticsEmpty = tweet.likes === 0 && tweet.retweets === 0;

  return (
    <div className='flex flex-col'>
      <div className='py-3 px-4 w-full border-t border-t-bordergray'>
        <div className='flex flex-col w-full gap-3'>
          {/* img */}
          <div className='flex w-full gap-2'>
            <img
              crossOrigin='anonymous'
              src={tweet.pfp || 'defaultpfp.png'}
              alt='tweet profile picture'
              className='h-14 w-14 rounded-full bg-white mt-2'
            />
            <div className='flex flex-col w-full py-2'>
              <div className='flex justify-between items-center'>
                <div className='flex flex-col text-sm'>
                  <p className='font-semibold'>{tweet.displayname}</p>
                  <p className='text-textgray'>@{tweet.username}</p>
                </div>
                <button
                  className='z-20'
                  onClick={() => setOpen((v) => !v)}
                  ref={setReference}
                >
                  <FiMoreHorizontal />
                </button>

                <TweetOptions
                  reference={reference}
                  open={open}
                  setOpen={setOpen}
                  isAuthor={tweet.isAuthor}
                  isBookmarked={tweet.isBookmarked}
                  id={tweet.id}
                />
              </div>
            </div>
          </div>
          <p className='mt-0.5 w-11/12 break-words text-md font-normal'>
            {tweet.content}
          </p>
          <p className='text-textgray text-sm'>7:38 AM · Apr 26, 2023</p>
        </div>
      </div>
      {!analyticsEmpty && (
        <div className='w-full border-t border-t-bordergray border-b border-b-bordergray px-2 py-4 flex gap-5'>
          <TweetAnalytic count={tweet.likes} type='Likes' />
          <TweetAnalytic count={tweet.retweets} type='Retweets' />
        </div>
      )}
      <div className='w-full border-t border-t-bordergray border-b border-b-bordergray px-2 py-4 flex gap-5 justify-center'>
        <TweetButtons tweet={tweet} showNumbers={false} />
      </div>
    </div>
  );
}

function TweetAnalytic({ count, type }: { count: number; type: string }) {
  return count !== 0 ? (
    <p className='text-sm text-textgray hover:underline hover:cursor-pointer'>
      <span className='text-white font-bold'>{count}</span> {type}
    </p>
  ) : (
    <></>
  );
}

export default TweetView;

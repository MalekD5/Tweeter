import type { LatestTweetsType } from '@common/types/Endpoints';
import type { ElementType } from '../Dropdown';
import { useEffect, useState } from 'react';
import { AiOutlineRetweet } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import TweetOptions from './TweetOptions';
import TweetButtons from './TweetButtons';

type TweetProps = {
  tweet: LatestTweetsType;
  showRetweets?: boolean;
};

function TweetCardV3(props: TweetProps) {
  const { tweet } = props;
  const [open, setOpen] = useState(false);
  const [reference, setReference] = useState<ElementType>(null);

  return (
    <div className='py-3 px-4 w-full border-t border-t-bordergray border-b border-b-bordergray hover:bg-white/20 hover:cursor-pointer'>
      <Link to={`/tweet/${tweet.id}`}>
        {tweet.isRetweeted && props.showRetweets && (
          <div className='ml-5 flex gap-3 items-center w-fit'>
            <AiOutlineRetweet className='text-md fill-textgray' />
            <Text className='text-sm text-textgray hover:underline hover:cursor-pointer'>
              You Retweeted
            </Text>
          </div>
        )}
        <div className='flex w-full gap-2'>
          {/* img */}
          <img
            crossOrigin='anonymous'
            src={tweet.pfp || 'defaultpfp.png'}
            alt='tweet profile picture'
            className='h-14 w-14 rounded-full bg-white mt-2'
          />
          <div className='basis-10/12 flex flex-col w-full py-2'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-1 text-sm'>
                <span className='font-semibold'>{tweet.displayname}</span>
                <span className='text-textgray'>
                  @{tweet.username} · {tweet.created_at}
                </span>
              </div>
              <button
                className='z-20'
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setOpen((v) => !v);
                }}
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

            <p className='mt-0.5 w-11/12 break-words text-sm font-normal'>
              {tweet.text}
            </p>
            <TweetButtons tweet={tweet} />
          </div>
        </div>
      </Link>
    </div>
  );
}

TweetCardV3.defaultProps = {
  img: './defaultpfp.png',
  retweets: 0,
  likes: 0,
  comments: 0,
  showRetweets: false
};
('blue');

export default TweetCardV3;

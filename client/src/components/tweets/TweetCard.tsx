import type { LatestTweetsType } from '@common/types/Endpoints';
import type { IconType } from 'react-icons';
import type { ElementType } from '../Dropdown';
import { useState } from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineRetweet,
  AiOutlineShareAlt
} from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useHover } from '@mantine/hooks';
import { useMutation } from 'react-query';
import {
  LikeTweet,
  UnlikeTweet,
  createRetweet,
  removeRetweet
} from '@/api/tweetAPI';
import { queryClient } from '@/api/api';
import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import CommentModal from './CommentModal';
import TweetOptions from './TweetOptions';

type TweetProps = {
  tweet: LatestTweetsType;
  showRetweets?: boolean;
};

// Hover - icon - text
const colors = {
  red: ['bg-pink-800/30', 'fill-pink-500', 'text-pink-500'],
  blue: ['bg-sky-600/30', 'fill-blue-500', 'text-blue-500'],
  green: ['bg-green-600/30', 'fill-green-400', 'text-green-400']
};

type colorsType = keyof typeof colors;

type TweetButtonProps = {
  Icon: IconType;
  onClick: () => void;
  count?: number;
  color?: colorsType;
  active?: boolean;
  ActiveIcon?: IconType;
};

function TweetCardV3(props: TweetProps) {
  const { tweet } = props;

  const [open, setOpen] = useState(false);
  const [reference, setReference] = useState<ElementType>(null);
  const [comment, handlers] = useState(false);

  const onSuccess = () => {
    queryClient.invalidateQueries(['Tweet'], { exact: true });
    queryClient.invalidateQueries(['Bookmark'], { exact: true });
  };

  const likeMutation = useMutation({
    mutationFn: LikeTweet,
    onSuccess
  });

  const unLikeMutation = useMutation({
    mutationFn: UnlikeTweet,
    onSuccess
  });

  const retweetMutation = useMutation({
    mutationFn: createRetweet,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries(['User'], { exact: true });
    }
  });

  const unRetweetMutation = useMutation({
    mutationFn: removeRetweet,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries(['User'], { exact: true });
    }
  });

  const handleLikeButton = async () => {
    try {
      if (!tweet.isLiked) {
        await likeMutation.mutateAsync(tweet.id);
      } else {
        await unLikeMutation.mutateAsync(tweet.id);
      }
    } catch (err: any) {
      throw err;
    }
  };

  const handleRetweetButton = async () => {
    try {
      if (!tweet.isRetweeted) {
        await retweetMutation.mutateAsync(tweet.id);
      } else {
        await unRetweetMutation.mutateAsync(tweet.id);
      }
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <>
      <CommentModal open={comment} setOpen={handlers} replying_to={tweet.id} />
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

              <p className='mt-0.5 w-11/12 break-words text-sm font-normal'>
                {tweet.text}
              </p>
              <div className='w-9/12 mt-3 flex justify-between items-center'>
                <TweetButton
                  onClick={() => {
                    handlers((v) => !v);
                  }}
                  Icon={FaRegComment}
                  count={tweet.comments}
                />
                <TweetButton
                  onClick={handleRetweetButton}
                  Icon={AiOutlineRetweet}
                  count={tweet.retweets}
                  active={tweet.isRetweeted}
                  ActiveIcon={AiOutlineRetweet}
                  color='green'
                />
                <TweetButton
                  onClick={handleLikeButton}
                  active={tweet.isLiked}
                  ActiveIcon={AiFillHeart}
                  Icon={AiOutlineHeart}
                  count={tweet.likes}
                  color='red'
                />
                <TweetButton onClick={() => {}} Icon={AiOutlineShareAlt} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

function TweetButton({
  count,
  Icon,
  color,
  onClick,
  active,
  ActiveIcon
}: TweetButtonProps) {
  const { hovered, ref } = useHover<HTMLButtonElement>();
  const col = colors[color!];
  const { format } = Intl.NumberFormat('en', { notation: 'compact' });

  const formatted_count = !count ? undefined : format(count as number);
  return (
    <button
      className='flex gap-3 justify-center items-center w-fithover:rounded-full'
      ref={ref}
      onClick={onClick}
    >
      <div className='flex justify-center items-center'>
        <div
          className={`absolute ${
            hovered && col[0]
          } p-[1.1rem] rounded-full  transition-colors`}
        ></div>
        {active && ActiveIcon ? (
          <ActiveIcon className={`${col[1]} text-xl`} />
        ) : (
          <Icon
            className={`${
              hovered ? col[1] : 'fill-textgray'
            } text-xl  transition-colors`}
          />
        )}
      </div>
      {formatted_count && (
        <span
          className={`${
            hovered ? col[2] : 'text-textgray'
          } text-xs  transition-colors`}
        >
          {formatted_count}
        </span>
      )}
    </button>
  );
}

TweetCardV3.defaultProps = {
  img: './defaultpfp.png',
  retweets: 0,
  likes: 0,
  comments: 0,
  showRetweets: false
};

TweetButton.defaultProps = {
  color: 'blue'
};

export default TweetCardV3;

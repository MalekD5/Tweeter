import { queryClient } from '@/api/api';
import {
  LikeTweet,
  UnlikeTweet,
  createRetweet,
  removeRetweet
} from '@/api/tweetAPI';
import type { LatestTweetsType } from '@common/types/Endpoints';
import { useState } from 'react';
import { useMutation } from 'react-query';
import type { IconType } from 'react-icons';
import { FaRegComment } from 'react-icons/fa';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineRetweet,
  AiOutlineShareAlt
} from 'react-icons/ai';
import { useHover } from '@mantine/hooks';
import CommentModal from './CommentModal';

// Hover - icon - text
const colors = {
  red: ['bg-pink-800/30', 'fill-pink-500', 'text-pink-500'],
  blue: ['bg-sky-600/30', 'fill-blue-500', 'text-blue-500'],
  green: ['bg-green-600/30', 'fill-green-400', 'text-green-400']
};

type colorsType = keyof typeof colors;

type TweetButtonsProps = {
  tweet: LatestTweetsType;
  showNumbers: boolean;
};
type TweetButtonProps = {
  Icon: IconType;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  count?: number;
  color?: colorsType;
  active?: boolean;
  ActiveIcon?: IconType;
};

export function TweetButtons({ tweet, showNumbers }: TweetButtonsProps) {
  const [comment, handlers] = useState(false);

  const onSuccess = () => {
    queryClient.invalidateQueries(['Tweet'], { exact: true });
    queryClient.invalidateQueries(['Bookmark'], { exact: true });
    if (!showNumbers)
      queryClient.invalidateQueries(['Comment'], { exact: true });
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

  const handleLikeButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
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

  const handleRetweetButton = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    e.preventDefault();

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
      <div className='w-9/12 mt-3 flex justify-between items-center'>
        <TweetButton
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handlers((v) => !v);
          }}
          Icon={FaRegComment}
          count={showNumbers ? tweet.comments : 0}
        />
        <TweetButton
          onClick={handleRetweetButton}
          Icon={AiOutlineRetweet}
          count={showNumbers ? tweet.retweets : 0}
          active={tweet.isRetweeted}
          ActiveIcon={AiOutlineRetweet}
          color='green'
        />
        <TweetButton
          onClick={handleLikeButton}
          active={tweet.isLiked}
          ActiveIcon={AiFillHeart}
          Icon={AiOutlineHeart}
          count={showNumbers ? tweet.likes : 0}
          color='red'
        />
        <TweetButton
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          Icon={AiOutlineShareAlt}
        />
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
  const [comment, handlers] = useState(false);

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

TweetButtons.defaultProps = {
  showNumbers: true
};

TweetButton.defaultProps = {
  color: 'blue'
};

export default TweetButtons;

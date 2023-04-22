import React, { useState } from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineRetweet,
  AiOutlineShareAlt
} from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiDelete, FiMoreHorizontal } from 'react-icons/fi';
import { BiBookmarkMinus, BiBookmarkPlus } from 'react-icons/bi';
import { useHover } from '@mantine/hooks';
import { useMutation } from 'react-query';
import { DeleteTweet, LikeTweet, UnlikeTweet } from '@/api/tweetAPI';
import { queryClient } from '@/api/api';
import { BookmarkTweet, UnBookmarkTweet } from '@/api/bookmarkAPI';
import type { LatestTweetsType } from '@common/types/Endpoints';
import type { IconType } from 'react-icons';
import Dropdown, { type ElementType } from '../Dropdown';

type TweetProps = {
  tweet: LatestTweetsType;
};

type TweetOptionButtonProps = { onClick: () => void } & React.PropsWithChildren;

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

type TweetOptionsProps = Pick<LatestTweetsType, 'isBookmarked' | 'isAuthor'> & {
  reference: ElementType;
  open: boolean;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function TweetCardV3(props: TweetProps) {
  const { tweet } = props;

  const [open, setOpen] = useState(false);
  const [reference, setReference] = useState<ElementType>(null);

  const likeMutation = useMutation({
    mutationFn: LikeTweet,
    onSuccess: (_data) => {
      queryClient.invalidateQueries(['Tweet'], { exact: true });
    }
  });

  const unLikeMutation = useMutation({
    mutationFn: UnlikeTweet,
    onSuccess: () => {
      queryClient.invalidateQueries(['Tweet']);
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

  return (
    <div className='flex py-3 px-4 gap-2 w-full border-t border-t-bordergray border-b border-b-bordergray'>
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
            onClick={() => {}}
            Icon={FaRegComment}
            count={tweet.comments}
          />
          <TweetButton
            onClick={() => {}}
            Icon={AiOutlineRetweet}
            count={tweet.retweets}
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

function TweetOptions({
  id,
  isBookmarked,
  isAuthor,
  open,
  reference,
  setOpen
}: TweetOptionsProps) {
  const bookmark = useMutation({
    mutationFn: BookmarkTweet,
    onSuccess: (_data, tweetId) => {
      queryClient.setQueryData<LatestTweetsType | undefined>(
        ['Tweet', tweetId],
        (data) => {
          if (!data) return undefined;
          return {
            ...data,
            isBookmarked: true
          };
        }
      );
      queryClient.invalidateQueries(['Tweet'], { exact: true });
      queryClient.invalidateQueries(['Bookmark'], { exact: true });
    }
  });
  const unbookmark = useMutation({
    mutationFn: UnBookmarkTweet,
    onSuccess: (_data, tweetId) => {
      queryClient.setQueryData<LatestTweetsType | undefined>(
        ['Tweet', tweetId],
        (data) => {
          if (!data) return undefined;
          return {
            ...data,
            isBookmarked: false
          };
        }
      );
      queryClient.invalidateQueries(['Tweet'], { exact: true });
      queryClient.invalidateQueries(['Bookmark'], { exact: true });
    }
  });

  const delete_tweet = useMutation({
    mutationFn: DeleteTweet,
    onSuccess: () => {
      queryClient.invalidateQueries(['Tweet'], { exact: true });
      queryClient.invalidateQueries(['Bookmark'], { exact: true });
    }
  });

  const handleBookmark = async () => {
    try {
      if (!isBookmarked) await bookmark.mutateAsync(id);
      else await unbookmark.mutateAsync(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTweet = async () => {
    try {
      await delete_tweet.mutateAsync(id);
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <Dropdown
      reference={reference}
      open={open}
      setOpen={setOpen}
      className='shadow shadow-gray-500 rounded-lg py-2.5 bg-black w-fit flex flex-col'
    >
      <TweetOptionButton onClick={handleBookmark}>
        {isBookmarked ? (
          <>
            <BiBookmarkMinus className='text-lg fill-red-500' />
            <p className='text-sm font-bold text-red-500'>Unbookmark</p>
          </>
        ) : (
          <>
            <BiBookmarkPlus className='text-lg' />
            <p className='text-sm font-bold'>Add Bookmark</p>
          </>
        )}
      </TweetOptionButton>
      {isAuthor && (
        <TweetOptionButton onClick={handleDeleteTweet}>
          <FiDelete className='text-lg' />
          <p className='text-sm font-bold'>Delete tweet</p>
        </TweetOptionButton>
      )}
    </Dropdown>
  );
}

function TweetOptionButton({ onClick, children }: TweetOptionButtonProps) {
  return (
    <button
      className='text-md mt-2 hover:bg-search py-0.5 px-4 w-full'
      onClick={onClick}
    >
      <div className='flex gap-3 items-center text-base'>{children}</div>
    </button>
  );
}

function CommentModal() {}

TweetCardV3.defaultProps = {
  img: './defaultpfp.png',
  retweets: '',
  likes: '',
  comments: '',
  bookmarked: false
};

TweetButton.defaultProps = {
  color: 'blue'
};

export default TweetCardV3;

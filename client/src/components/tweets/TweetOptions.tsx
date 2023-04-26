import { queryClient } from '@/api/api';
import { BookmarkTweet, UnBookmarkTweet } from '@/api/bookmarkAPI';
import { DeleteTweet } from '@/api/tweetAPI';
import type { LatestTweetsType } from '@common/types/Endpoints';
import { useMutation } from 'react-query';
import Dropdown, { type ElementType } from '../Dropdown';
import { BiBookmarkMinus, BiBookmarkPlus } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';

type TweetOptionsProps = Pick<LatestTweetsType, 'isBookmarked' | 'isAuthor'> & {
  reference: ElementType;
  open: boolean;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type TweetOptionButtonProps = { onClick: () => void } & React.PropsWithChildren;

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

export default TweetOptions;

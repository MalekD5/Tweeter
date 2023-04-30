import { TweetCard } from '@/components';
import { Textarea } from '@mantine/core';
import { useContext, useEffect } from 'react';
import { SidebarContext } from '@/context/SidebarContext';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { useUserStore } from '@/utils/storage';
import { TransformedValues, useForm } from '@mantine/form';
import { useMutation, useQuery } from 'react-query';
import { createTweet, getExploreTweets } from '@/api/tweetAPI';
import { queryClient } from '@/api/api';
import validator from 'validator';
import { LatestTweetsType } from '@common/types/Endpoints';

function Explore() {
  const { user } = useUserStore();
  const { setValue } = useContext(SidebarContext);
  const { data } = useQuery({
    queryFn: getExploreTweets,
    queryKey: ['Tweet'],
    staleTime: 10 * (60 * 1000),
    retry: false,
    onSuccess: (data) => {
      data?.forEach((tweet) =>
        queryClient.setQueryData(['Tweet', tweet.id], tweet)
      );
    },
    useErrorBoundary: true
  });

  const form = useForm({
    initialValues: {
      text: ''
    },
    validate: {
      text: (value) =>
        validator.isLength(value, { min: 1, max: 280 })
          ? null
          : 'text must be between 1-280 characters long'
    }
  });

  const addTweet = useMutation({
    mutationFn: createTweet,
    onSuccess: () => {
      queryClient.invalidateQueries(['Tweet'], { exact: true });
    }
  });

  useEffect(() => {
    setValue('Explore');
  }, []);

  const handleSubmit = async (data: TransformedValues<typeof form>) => {
    const { text } = data;
    try {
      await addTweet.mutateAsync(text);
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <div className='flex w-full'>
      <div
        className='w-full lg:w-1/2 border-r border-r-bordergray border-l 
          border-l-bordergray min-h-[100vh] mb-16 md:mb-0'
      >
        {/* Home */}
        <div className='px-4 flex backdrop-blur-lg justify-between items-center w-full h-14 sticky top-0 '>
          <span className='text-2xl font-normal'>Home</span>
          <MdOutlineAutoAwesome className='text-3xl' />
        </div>
        {/* Tweet action */}
        <div className='flex w-full py-8 px-4'>
          <img
            crossOrigin='anonymous'
            className='cursor-pointer w-14 h-14 rounded-full bg-white'
            src={`${user?.pfp ?? 'defaultpfp.png'}`}
            alt='tweet profile picture'
          />
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className='flex flex-col min-h-16 justify-evenly pt-1 w-full ml-3'
          >
            <Textarea
              className='w-full bg-black text-md resize-none overflow-hidden placeholder:text-gray-500'
              styles={{
                input: {
                  border: 'none'
                }
              }}
              placeholder="what's happening?"
              maxLength={250}
              minRows={2}
              maxRows={10}
              name='text'
              autosize
              {...form.getInputProps('text')}
            />
            <div className='flex gap-2 w-full justify-end mt-3 items-center'>
              <button
                type='submit'
                className='rounded-full bg-blue-500 py-4 px-6 text-sm'
              >
                Tweet
              </button>
            </div>
          </form>
        </div>
        {/* Tweets */}
        {data?.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

interface AxiosErr {
  config: {
    _retry: boolean;
  };
  response: {
    status: number;
  };
}

function validate(err: unknown): err is Partial<AxiosErr> {
  const error = err as AxiosErr;
  return (
    error?.config?._retry !== undefined && error?.response?.status !== undefined
  );
}

export default Explore;

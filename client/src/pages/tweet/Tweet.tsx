import { queryClient } from '@/api/api';
import { addComment, createTweet, getId } from '@/api/tweetAPI';
import { TweetCard, TweetView } from '@/components';
import { useUserStore } from '@/utils/storage';
import { Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useMutation, useQuery } from 'react-query';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import validator from 'validator';

function Tweet() {
  const { id } = useParams();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (!id) {
    return <div>error</div>;
  }
  const { data } = useQuery({
    queryKey: ['Comment', id],
    queryFn: async () => await getId(id)
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

  const addCommentMut = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['Comment', id]);
    }
  });

  const handleSubmit = async (data: any) => {
    const { text } = data;
    try {
      await addCommentMut.mutateAsync({ text, replying_to: id });
      form.reset();
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <div className='w-1/2'>
      <div className='px-4 flex backdrop-blur-lg items-center w-full h-14 sticky top-0 '>
        <div className='flex gap-5 w-fit items-center'>
          <Link to='/explore' className='hover:bg-bordergray p-2 rounded-full'>
            <AiOutlineArrowLeft className='text-2xl' />
          </Link>
          <div>
            <p className='text-xl font-Bold'>Tweet</p>
          </div>
        </div>
      </div>
      {data?.tweet?.map((tweet) => (
        <TweetView key={tweet.id} tweet={tweet} />
      ))}
      <div className='flex items-center w-full py-8 px-4'>
        <img
          crossOrigin='anonymous'
          className='cursor-pointer w-16 h-16 rounded-full bg-white'
          src={`${user?.pfp ?? 'defaultpfp.png'}`}
          alt='tweet profile picture'
        />
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className='flex items-center min-h-16 justify-evenly pt-1 w-full ml-3'
        >
          <Textarea
            className='w-full bg-black text-md resize-none overflow-hidden placeholder:text-gray-500'
            styles={{
              input: {
                border: 'none'
              }
            }}
            placeholder='Type your reply'
            maxLength={250}
            minRows={1}
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
              Reply
            </button>
          </div>
        </form>
      </div>
      {data?.comments?.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}

export default Tweet;

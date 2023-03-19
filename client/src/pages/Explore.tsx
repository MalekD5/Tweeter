import { ResizableTextarea, TweetCard } from '@/components';
import { useGetTweetsQuery } from '@/features/tweets/tweetService';
import { useAuth } from '@/hooks/AuthHook';
import { FieldValues, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useAddTweetMutation } from '@/features/tweets/tweetService';
import { useContext, useEffect, useRef, useState } from 'react';
import { SidebarContext } from '@/context/SidebarContext';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { useUser } from '@/hooks/UserHook';

function Explore() {
  const { setValue } = useContext(SidebarContext);
  const { data, isError, error } = useGetTweetsQuery(null);
  const { token, logout } = useAuth();
  const user = useUser(token);
  const { register, handleSubmit: formSubmit } = useForm();
  const [tweet] = useAddTweetMutation();

  useEffect(() => {
    setValue('Explore');
  }, []);

  if (isError) {
    if ('originalStatus' in error && error.originalStatus === 403) {
      logout();
      return <Navigate to='/' />;
    }

    return (
      <div>
        <div className='border border-gray-500 h-[15vh] border-t-0 border-b-0'>
          <h1 className='text-2xl font-bold p-4'>Home</h1>
        </div>
        <p className='text-xl text-center'>something went wrong</p>
      </div>
    );
  }

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const res = await fetch('http://localhost:5000/api/v1/upload', {
  //     method: 'POST',
  //     body: formData,
  //     headers: {
  //       authorization: `Bearer ${token}`
  //     },
  //     credentials: 'include'
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // };

  const onSubmit = async (data: FieldValues) => {
    const { text } = data;
    try {
      const result = await tweet({
        text
      });
      console.log(result);
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <div className='flex w-full'>
      <div
        className='w-1/2 border-r border-r-bordergray border-l 
          border-l-bordergray min-h-[100vh]'
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
            src={`${user?.pfp || 'defaultpfp.png'}`}
            alt='tweet profile picture'
          />
          <form
            onSubmit={formSubmit(onSubmit)}
            className='flex flex-col min-h-16 justify-evenly pt-1 w-full ml-3'
          >
            <ResizableTextarea
              className='w-full bg-black border-none outline-none text-md resize-none overflow-hidden placeholder:text-gray-500'
              placeholder="what's happening?"
              maxLength={250}
              name='text'
              register={register}
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
        {data?.map((i: any) => (
          <TweetCard
            key={i.id}
            img={i.pfp}
            text={i.text}
            displayname={i.username}
            tag={i.username}
            published={i.date}
          />
        ))}
      </div>
      <div className='py-4 px-6 w-1/2 sticky top-0 max-h-[100vh]'>
        <Search />
        <WhoToFollow />
      </div>
    </div>
  );
}

function Search() {
  const [focused, setFocused] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (ref?.current) {
      ref.current.focus();
    }
  };

  return (
    <div className='w-9/12 text-sm flex justify-center items-center'>
      <button
        className={`p-4 rounded-full bg-search rounded-tr-none rounded-br-none border border-r-0 ${
          focused ? 'border-blue-600' : 'border-search'
        }`}
        onClick={handleClick}
      >
        <AiOutlineSearch className='text-xl' />
      </button>
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder='search for anything...'
        className='w-full bg-search rounded-full rounded-tl-none rounded-bl-none p-4 outline-none border border-search focus:border-blue-600 border-l-0'
        ref={ref}
      />
    </div>
  );
}

function WhoToFollow() {
  return (
    <div className='mt-10 flex flex-col justify-center items-center bg-search rounded-2xl px-4 py-3 w-9/12'>
      <span className='text-xl font-bold self-start mb-4'>Who to follow</span>
      <div className='w-full flex flex-col gap-5'>
        <WhoToFollowUser />
        <WhoToFollowUser />
      </div>
    </div>
  );
}

function WhoToFollowUser() {
  return (
    <div className='flex items-center gap-4 w-full pb-3'>
      <img
        src='defaultpfp.png'
        alt='Who to follow image'
        className='h-14 w-14 bg-white rounded-full'
      />
      <div className='basis-1/2 flex flex-col justify-center'>
        <span className='text-base font-semibold'>Brad Traversy</span>
        <span className='text-textgray text-sm'>@traversymedia</span>
      </div>
      <button className='bg-white px-4 py-2 text-sm text-black font-bold rounded-full'>
        Follow
      </button>
    </div>
  );
}

export default Explore;

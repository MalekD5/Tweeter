import { Button, SignInModal, SignUpModal } from '@/components';

import { useState } from 'react';

function Landing() {
  const [openSignIn, setSignIn] = useState(false);
  const [openSignUp, setSignUp] = useState(false);

  return (
    <>
      <div className='bg-inherit'></div>
      <div className='fixed bottom-0 bg-blue-400 w-full py-4'>
        <div className='flex justify-around gap-6 bg-inherit'>
          <div className='flex flex-col justify-start bg-inherit'>
            <h1 className='text-3xl font-bold bg-inherit'>
              Don’t miss what’s happening
            </h1>
            <p className='text-md font-light bg-inherit'>
              People on Tweeter are the first to know.
            </p>
          </div>
          <div className='flex justify-center items-center bg-inherit gap-2'>
            <Button
              color='bordered-default'
              onClick={() => setSignIn((v) => !v)}
            >
              Sign In
            </Button>
            <Button color='white' onClick={() => setSignUp((v) => !v)}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      <SignInModal open={openSignIn} setOpen={setSignIn} />
      <SignUpModal open={openSignUp} setOpen={setSignUp} />
    </>
  );
}

export default Landing;

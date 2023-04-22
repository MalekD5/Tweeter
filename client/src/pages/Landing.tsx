import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <>
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
              color='outline-default'
              onClick={() => navigate('/i/flow/login', { replace: true })}
            >
              Sign In
            </Button>
            <Button
              color='white'
              onClick={() => navigate('/i/flow/register', { replace: true })}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;

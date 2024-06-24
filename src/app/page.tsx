import Landing from '@/components/landing';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { auth, signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { BsGoogle, BsTwitterX } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

export default async function Home() {
  const session = await auth();

  if (session?.user) redirect('/home');

  return (
    <Landing>
      <BsTwitterX className="block size-16 px-2 py-10 md:hidden" aria-hidden />
      <h1 className="py-0 text-5xl font-bold md:py-20">Happening Now</h1>
      <h3 className="mb-8 text-3xl font-bold">Join Today.</h3>
      <div className="mb-7 space-y-4">
        <div className="flex flex-col gap-2">
          <form
            action={async () => {
              'use server';
              await signIn('google');
            }}
          >
            <Button
              type="submit"
              size="lg"
              tabIndex={0}
              rounded="full"
              variant="white"
              className="w-full"
            >
              <FcGoogle aria-hidden className="size-6" />
              Sign up using Google
            </Button>
          </form>
        </div>
        <p className="max-w-xs text-xs font-light text-zinc-500">
          By Signing up you agree to our <span className="text-bluish">Terms of Service</span> and{' '}
          <span className="text-bluish">Privacy Policy</span>, including{' '}
          <span className="text-bluish">Cookie use</span>.
        </p>
      </div>
      <Separator text="or" />
      <div className="flex flex-col space-y-4">
        <h3 className="text-xl font-bold">Already have an account?</h3>
        <form
          action={async () => {
            'use server';
            await signIn('google', undefined, {
              prompt: 'consent',
              access_type: 'offline',
              response_type: 'code',
            });
          }}
        >
          <Button
            size="lg"
            rounded="full"
            className="flex w-full gap-2 text-bluish"
            variant="outline"
          >
            <BsGoogle />
            Sign in with Google
          </Button>
        </form>
      </div>
    </Landing>
  );
}

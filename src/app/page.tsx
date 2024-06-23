import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { signIn } from '@/lib/auth';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <main className="grid w-full grid-cols-1 gap-0 px-6 md:grid-cols-2 md:gap-4 md:px-0">
        <div
          className="hidden h-full w-full px-4 pt-4 md:grid md:place-content-center md:px-0 md:pt-0"
          aria-hidden
        >
          <Image
            className="hidden md:block"
            aria-hidden
            src="/logo.svg"
            alt="Logo"
            width={350}
            height={350}
          />
        </div>
        <div className="container md:p-5">
          <div className="w-full md:w-1/2">
            <Image
              className="block px-2 py-10 md:hidden"
              aria-hidden
              src="/logo.svg"
              alt="Logo"
              width={64}
              height={64}
            />
            <h1 className="py-0 text-5xl font-bold md:py-20">Happening Now</h1>
            <h3 className="mb-8 text-3xl font-bold">Join Today.</h3>
            <div className="mb-7 space-y-4">
              <div className="flex flex-col gap-2">
                <form
                  className="w-full"
                  action={async () => {
                    'use server';
                    await signIn('google');
                  }}
                >
                  <Button type="submit" size="lg" tabIndex={0} rounded="full" variant="white">
                    <Image aria-hidden src="/google.svg" alt="Google" width={24} height={24} />
                    Sign up using Google
                  </Button>
                </form>
              </div>
              <p className="max-w-xs text-xs font-light text-zinc-500">
                By Signing up you agree to our <span className="text-bluish">Terms of Service</span>{' '}
                and <span className="text-bluish">Privacy Policy</span>, including{' '}
                <span className="text-bluish">Cookie use</span>.
              </p>
            </div>
            <Separator text="or" />
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-bold">Already have an account?</h3>
              <Button size="lg" rounded="full" className="text-bluish" variant="outline">
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="absolute bottom-2 w-full text-center text-sm text-muted-foreground">
        &copy; 2024 Malek Corp.
      </footer>
    </>
  );
}

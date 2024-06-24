import Landing from '@/components/landing';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { MultiStepForm } from './_components/forms';
import MultiStepFormContextContainer from './_context/multi-step-form-context';

export default async function CompleteSignup() {
  const session = await auth();

  if (!session?.user) return redirect('/');

  const { user } = session;

  if (user.username) {
    return redirect('/home');
  }
  return (
    <Landing>
      <div className="flex flex-col gap-5 py-0 md:py-20">
        <h1 className="flex py-0 text-5xl font-bold">Complete Signup</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-md cursor-pointer self-start text-bluish-foreground">
                What is this?
              </p>
            </TooltipTrigger>
            <TooltipContent className="max-w-md bg-primary text-sm">
              Our systems have detected that you did not complete the signup process. in order to
              proceed you must provide the following information: username, display name, birth day.
              you can also provide some optional information such as: location and bio.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <MultiStepFormContextContainer>
        <MultiStepForm />
      </MultiStepFormContextContainer>
    </Landing>
  );
}

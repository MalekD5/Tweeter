/* eslint-disable @next/next/no-img-element */

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { IoIosMore } from 'react-icons/io';

export default async function User() {
  const session = await auth();

  if (!session?.user) return redirect('/');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-full p-3 hover:bg-zinc-700">
          <img
            src={session.user?.image!}
            className="rounded-full"
            alt="user logo"
            width={40}
            height={40}
          />
          <div className="hidden flex-col lg:flex">
            <p className="text-sm">{session.user?.name}</p>
            <p className="text-sm text-zinc-700">@{session.user?.name}</p>
          </div>
          <div className="hidden grow basis-auto justify-end lg:flex">
            <IoIosMore />{' '}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
          className="border-none outline-none"
        >
          <Button className="border-none outline-none" type="submit" variant="ghost" rounded="full">
            Logout from {session.user?.name}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

/* eslint-disable @next/next/no-img-element */

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { IoIosMore } from 'react-icons/io';

export default async function User() {
  const session = await auth();

  if (!session?.user) return redirect('/');

  return (
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
  );
}

/* eslint-disable @next/next/no-img-element */

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { IoIosMore } from 'react-icons/io';

export default async function User() {
  const session = await auth();

  if (!session?.user) return redirect('/');

  return (
    <div className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-full p-3 hover:bg-zinc-700">
      <img src={session.user?.image!} alt="user logo" width={32} height={32} />
      <div className="flex flex-col">
        <p className="text-sm">{session.user?.name}</p>
        <p className="text-sm text-zinc-700">@{session.user?.name}</p>
      </div>
      <div className="flex grow basis-auto justify-end">
        <IoIosMore />{' '}
      </div>
    </div>
  );
}

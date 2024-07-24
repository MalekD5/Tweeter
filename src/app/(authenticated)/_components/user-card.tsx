/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Session } from "@/entities/session";
import { signOutAction } from "@/infrastructure/actions/auth.action";
import Image from "next/image";
import { IoIosMore } from "react-icons/io";

export default async function User({ session }: { session: Session }) {
  const data = session.session;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-full p-3 hover:bg-zinc-700">
          <Image
            src={data.image}
            unoptimized
            className="rounded-full"
            alt="user logo"
            width={40}
            height={40}
          />
          <div className="hidden flex-col lg:flex">
            <p className="text-sm">{data.displayName}</p>
            <p className="text-sm text-muted-foreground">@{data.username}</p>
          </div>
          <div className="hidden grow basis-auto justify-end lg:flex">
            <IoIosMore />{" "}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <form
          action={async () => {
            "use server";
            await signOutAction();
          }}
          className="border-none outline-none"
        >
          <Button className="border-none outline-none" type="submit" variant="ghost" rounded="full">
            Logout from @{data.username}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

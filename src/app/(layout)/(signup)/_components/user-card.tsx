/* eslint-disable @next/next/no-img-element */

import { getSession } from "@/actions/auth";
import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoIosMore } from "react-icons/io";

export default async function User() {
  const user = await getSession();

  if (!user.id) return redirect("/");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-full p-3 hover:bg-zinc-700">
          <Image
            src={user.image}
            unoptimized
            className="rounded-full"
            alt="user logo"
            width={40}
            height={40}
          />
          <div className="hidden flex-col lg:flex">
            <p className="text-sm">{user.displayName}</p>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
          <div className="hidden grow basis-auto justify-end lg:flex">
            <IoIosMore />{" "}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <form action={logout} className="border-none outline-none">
          <Button
            className="border-none outline-none"
            type="submit"
            variant="ghost"
            rounded="full"
          >
            Logout from @{user.username}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

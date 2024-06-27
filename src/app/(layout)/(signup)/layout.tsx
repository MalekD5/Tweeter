import Image from "next/image";
import { GoBookmark, GoBookmarkFill, GoHome, GoHomeFill } from "react-icons/go";
import { TbNotes, TbUser, TbUserFilled } from "react-icons/tb";
import {
  IoMailOutline,
  IoMailSharp,
  IoSettingsOutline,
  IoSettingsSharp,
} from "react-icons/io5";
import { Button } from "@/components/ui/button";
import User from "./_components/user-card";
import NavContainer from "./_components/nav-container";
import NavItem from "./_components/nav-item";
import { Page } from "./_context/types";
import { LiaFeatherAltSolid } from "react-icons/lia";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-[100px_1fr] grid-rows-1 lg:grid-cols-[0.8fr_1fr_1fr]">
      <header className="relative col-start-1 col-end-2 flex w-full justify-end border-r border-zinc-700">
        <div className="w-4/6 pr-2">
          <div className="relative">
            <NavContainer>
              <NavItem
                type={Page.HOME}
                icon={
                  <Image
                    src="/logo.svg"
                    aria-hidden
                    alt="logo"
                    width={32}
                    height={32}
                  />
                }
                removeText
              />
              <NavItem
                type={Page.HOME}
                icon={<GoHome />}
                active={<GoHomeFill />}
              />
              <NavItem
                type={Page.MESSAGES}
                icon={<IoMailOutline />}
                active={<IoMailSharp />}
              />
              <NavItem
                type={Page.BOOKMARKS}
                icon={<GoBookmark />}
                active={<GoBookmarkFill />}
              />
              <NavItem type={Page.LISTS} icon={<TbNotes />} />
              <NavItem
                type={Page.PROFILE}
                icon={<TbUser />}
                active={<TbUserFilled />}
              />
              <NavItem
                type={Page.SETTINGS}
                icon={<IoSettingsOutline />}
                active={<IoSettingsSharp />}
              />
              <Button
                className="text-md mt-2 py-0 font-bold lg:py-5"
                rounded="full"
                variant="blue"
              >
                <p className="hidden lg:block">Post</p>
                <LiaFeatherAltSolid className="block size-20 lg:hidden" />
              </Button>
            </NavContainer>
            <div className="absolute bottom-2 w-full">
              <User />
            </div>
          </div>
        </div>
      </header>
      <main className="col-start-2 col-end-3 lg:col-end-4">{children}</main>
    </div>
  );
}

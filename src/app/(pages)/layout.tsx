'use client';

import Image from 'next/image';
import { NavContext, Page } from './(layout)/_context/nav-context';
import { useState } from 'react';
import Nav from './(layout)/_components/nav-components';
import { GoBookmark, GoBookmarkFill, GoHome, GoHomeFill } from 'react-icons/go';
import { TbNotes, TbUser, TbUserFilled } from 'react-icons/tb';
import { IoMailOutline, IoMailSharp, IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<Page>(Page.HOME);

  return (
    <div className="grid min-h-screen grid-cols-3 grid-rows-1">
      <header className="relative col-start-1 col-end-2 flex w-full justify-end">
        <NavContext.Provider value={{ page, setPage }}>
          <Nav>
            <Nav.Item
              type={Page.HOME}
              icon={<Image src="/logo.svg" aria-hidden alt="logo" width={32} height={32} />}
              removeText
            />
            <Nav.Item type={Page.HOME} icon={<GoHome />} active={<GoHomeFill />} />
            <Nav.Item type={Page.MESSAGES} icon={<IoMailOutline />} active={<IoMailSharp />} />
            <Nav.Item type={Page.BOOKMARKS} icon={<GoBookmark />} active={<GoBookmarkFill />} />
            <Nav.Item type={Page.LISTS} icon={<TbNotes />} />
            <Nav.Item type={Page.PROFILE} icon={<TbUser />} active={<TbUserFilled />} />
            <Nav.Item
              type={Page.SETTINGS}
              icon={<IoSettingsOutline />}
              active={<IoSettingsSharp />}
            />
          </Nav>
        </NavContext.Provider>
      </header>
      <main className="col-start-2 col-end-4">{children}</main>
    </div>
  );
}

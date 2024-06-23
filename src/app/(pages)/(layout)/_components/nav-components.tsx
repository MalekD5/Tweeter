'use client';

import { Page, useNav } from '../_context/nav-context';
import { useState } from 'react';
import Link from 'next/link';
import { cva } from 'class-variance-authority';
import { IconContext } from 'react-icons';
import { capitalize } from '@/lib/utils';

type NavItemProps = {
  type: Page;
  icon: React.ReactNode;
  active?: React.ReactNode;
  removeText?: boolean;
};

const NavItemStyle = cva('p-3 w-fit text-lg flex gap-4 items-center justify-start', {
  variants: {
    state: {
      hover: 'bg-zinc-700 rounded-full',
    },
    text: {
      bold: 'font-bold',
    },
  },
});

export function NavItem(props: NavItemProps) {
  const { page, setPage } = useNav();
  const [hover, setHover] = useState<boolean>(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  const isCurrentPage = page === props.type;

  return (
    <Link
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={props.type}
      className="w-full"
      onClick={() => setPage(props.type)}
    >
      <div
        className={NavItemStyle({
          state: hover ? 'hover' : undefined,
          text: isCurrentPage ? 'bold' : undefined,
        })}
      >
        {isCurrentPage && props.active ? props.active : props.icon}
        {!props.removeText && capitalize(props.type)}
      </div>
    </Link>
  );
}

function NavContainer({ children }: { children: React.ReactNode }) {
  return (
    <IconContext.Provider value={{ size: '2rem' }}>
      <nav className="sticky top-0 flex h-screen w-4/6 flex-col gap-4 py-4">{children}</nav>
    </IconContext.Provider>
  );
}

const Nav = Object.assign(NavContainer, {
  Item: NavItem,
});

export default Nav;

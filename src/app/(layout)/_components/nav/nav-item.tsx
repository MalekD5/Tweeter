'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useNav } from '../../_context/nav-context';
import { cva } from 'class-variance-authority';
import { capitalize } from '@/lib/utils';
import { Page } from '../../_context/types';

type NavItemProps = {
  type: Page;
  icon: React.ReactNode;
  active?: React.ReactNode;
  removeText?: boolean;
};

const NavItemStyle = cva('p-3 w-fit text-lg flex gap-4 items-center justify-start cursor-pointer', {
  variants: {
    state: {
      hover: 'bg-zinc-700 rounded-full',
    },
    text: {
      bold: 'font-bold',
    },
  },
});

export default function NavItem(props: NavItemProps) {
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

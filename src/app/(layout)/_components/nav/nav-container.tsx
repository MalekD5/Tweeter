'use client';

import { IconContext } from 'react-icons';
import { NavContext } from '../../_context/nav-context';
import { useState } from 'react';
import { Page } from '../../_context/types';

export default function NavContainer({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<Page>(Page.HOME);

  return (
    <NavContext.Provider value={{ page, setPage }}>
      <IconContext.Provider value={{ size: '2rem' }}>
        <nav className="sticky top-0 flex h-screen flex-col py-4">{children}</nav>
      </IconContext.Provider>
    </NavContext.Provider>
  );
}

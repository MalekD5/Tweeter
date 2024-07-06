"use client";

import { NavContext } from "../_context";
import { useState } from "react";
import { Page } from "../_context/types";

export default function NavContainer({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<Page>(Page.HOME);

  return (
    <NavContext.Provider value={{ page, setPage }}>
      <nav className="flex h-screen flex-col py-4">{children}</nav>
    </NavContext.Provider>
  );
}

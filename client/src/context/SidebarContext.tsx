import { createContext, useState } from 'react';
import type { PropsWithChildren } from 'react';

export const SidebarContext = createContext<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}>({ value: 'Explore', setValue: () => {} });

export function SidebarProvider({ children }: PropsWithChildren) {
  const [value, setValue] = useState('Bookmarks');
  return (
    <SidebarContext.Provider value={{ value, setValue }}>
      {children}
    </SidebarContext.Provider>
  );
}

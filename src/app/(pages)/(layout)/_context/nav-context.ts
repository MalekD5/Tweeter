import { createContext, useContext } from 'react';

export enum Page {
  HOME = 'home',
  PROFILE = 'profile',
  BOOKMARKS = 'bookmarks',
  LISTS = 'lists',
  SETTINGS = 'settings',
  MESSAGES = 'messages',
}

type DataType = {
  page: Page;
  setPage: (page: Page) => void;
};

const NAV_DATA: DataType = {
  page: Page.HOME,
  setPage: (_page) => {},
};

export const NavContext = createContext(NAV_DATA);

export const useNav = () => useContext(NavContext);

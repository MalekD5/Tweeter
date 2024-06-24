'use client';
import { createContext, useContext } from 'react';
import { DataType, Page } from '../_types';

const NAV_DATA: DataType = {
  page: Page.HOME,
  setPage: (_page) => {},
};

export const NavContext = createContext(NAV_DATA);

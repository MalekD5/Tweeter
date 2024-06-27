"use client";
import { createContext } from "react";
import { DataType, Page } from "./types";

const NAV_DATA: DataType = {
  page: Page.HOME,
  setPage: (_page) => {},
};

export const NavContext = createContext(NAV_DATA);

export enum Page {
  HOME = "home",
  PROFILE = "profile",
  BOOKMARKS = "bookmarks",
  LISTS = "lists",
  SETTINGS = "settings",
  MESSAGES = "messages",
}

export type DataType = {
  page: Page;
  setPage: (page: Page) => void;
};

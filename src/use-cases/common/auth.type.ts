export type UpdateSessionDTO = {
  id: string;
  username: string;
  displayName: string;
};

export type CompleteSignUpDTO = UpdateSessionDTO & {
  birthDay: Date;
  location?: string;
  bio?: string;
};

export type UpdateUserResult = { success: true } | { success: false; error: string };

export type UpdateUser = (data: CompleteSignUpDTO) => Promise<UpdateUserResult>;
export type UpdateSession = (data: UpdateSessionDTO) => Promise<void>;
export type DestroySession = () => void;

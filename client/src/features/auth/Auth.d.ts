export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterData extends Credentials {
  username: string;
  displayname: string;
}

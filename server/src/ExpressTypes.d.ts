declare namespace Express {
  export interface Request {
    locals: {
      id: number;
      username: string;
      pfp: string;
    };
  }
}

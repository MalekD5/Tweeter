declare namespace Express {
  export interface Request {
    locals: {
      userid: number;
      username: string;
    };
  }
}

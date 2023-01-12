declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_PORT: number;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      PORT: number;
      NODE_ENV: string;
      SMPT_HOST: string;
      SMPT_PORT: number;
      SMPT_USER: string;
      SMPT_PASSWORD: string;
    }
  }
}

// turn this file into a module
export {};

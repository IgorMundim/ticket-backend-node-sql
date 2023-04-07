declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_PORT: number;
      DEBUG: boolean;
      DATABASE_CLIENT: string;
      DATABASE_USER: string;
      DATABASE: string;
      DATABASE_PASSWORD: string;
      DATABASE_HOST: string;
      DATABASE_POOL_MIN: number;
      DATABASE_POOL_MAX: number;
      DATABASE_POOL_IDLE: number;
    }
  }
  declare namespace Express {
    interface Request {
      account: string | JwtPayload;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

declare namespace Express {
  export interface Request {
    context: {
      accountId?: string | JwtPayload;
      isAdmin: boolean;
      isSuperUser: boolean;
      isActive: boolean;
    };
  }
}

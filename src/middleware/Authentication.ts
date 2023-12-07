import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../util/ApiError";
class Authentication {
  execute(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw new UnauthorizedError("Token is missing");
    }
    const [, token] = authToken.split(" ");

    try {
      const claims: any = verify(token, String(process.env.SECRET));
      req.context = {
        accountId: claims.sub,
        isAdmin: claims.isAdmin,
        isSuperUser: claims.isSuperUser,
        isActive: claims.isActive,
      };
      next();
    } catch (err) {
      throw new UnauthorizedError("Token is invalid!");
    }
  }
}
export default new Authentication();

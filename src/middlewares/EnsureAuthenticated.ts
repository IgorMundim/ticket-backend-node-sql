import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../util/ApiError";
class EnsureAuthenticated {
  isAuth(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw new UnauthorizedError("Token is missing");
    }
    const [, token] = authToken.split(" ");
    try {
      verify(token, "123");
      next();
    } catch (err) {
      throw new UnauthorizedError("Account or password incorrect");
    }
  }
}
export default new EnsureAuthenticated();

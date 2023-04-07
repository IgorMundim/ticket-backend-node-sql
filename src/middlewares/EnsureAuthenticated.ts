import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

class EnsureAuthenticated {
  isAuth(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;
    if (!authToken) {
      return res.status(401).json({ message: "Token is missing" });
    }
    const [, token] = authToken.split(" ");
    try {
      verify(token, "123");
      next();
    } catch (err) {
      // return res.status(401).json({ message: "Token invalid" });
      throw new Error("Account or password incorrect");
    }
  }
}
export default new EnsureAuthenticated();

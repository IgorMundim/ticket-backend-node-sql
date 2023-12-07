import { Request, Response } from "express";
import authenticate from "../models/AuthenticateAccount";

class AuthenticateController {
  async login(req: Request, res: Response) {
    try {
    const token = await authenticate.login({ ...req.body });
    return res.json(token);
    } catch(err){
      return res.status(400).json({"message": "Email or password is invalid"})
    }
 }
  async refreshToken(req: Request, res: Response) {
    try {
    const token = await authenticate.refreshToken(req.body.token);
    return res.json(token);
    } catch(err){
      return res.status(400).json({"message": "Token is invalid"})
    }
  }
}
export default new AuthenticateController();

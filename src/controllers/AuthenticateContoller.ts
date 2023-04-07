import { Request, Response } from "express";
import authenticate from "../models/AuthenticateAccount";

class AuthenticateController {
  async login(req: Request, res: Response) {
    const token = await authenticate.login({ ...req.body });
    return res.json(token);
  }
  async refreshToken(req: Request, res: Response) {
    const token = await authenticate.refreshToken(req.body.token);
    return res.json(token);
  }
}
export default new AuthenticateController();

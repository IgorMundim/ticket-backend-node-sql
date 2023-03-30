import { Request, Response } from "express";
import { query } from "../models/Account";

class AccountController {
  async index(req: Request, res: Response) {
     return res.json(await query.getAccount(Number(req.params.pk)));
  }
  async update(req: Request, res: Response) {
    const account = await query.updateAccount(req.body, Number(req.params.pk));
    if (account) return res.status(200).json();
    return res.status(400).json();
  }
  async create(req: Request, res: Response) {
    const account = await query.createAccount(req.body);
    if (account) return res.status(200).json();
    return res.status(400).json();
  }
  async delete(req: Request, res: Response) {
    const account = await query.deleteAccount(Number(req.params.pk));
    if (account) return res.status(200).json();
    return res.status(400).json();
  }
}

export default new AccountController();

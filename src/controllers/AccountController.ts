import { Request, Response } from "express";
import query from "../models/Account";

class AccountController {
  async index(req: Request, res: Response) {
    const account = await query.getAccount(Number(req.params.pk));
    if (account) return res.status(200).json(account);
    return res.status(400).json({ message: "Account not found" });
  }
  async update(req: Request, res: Response) {
    const account = await query.updateAccount(
      { ...req.body },
      Number(req.params.pk)
    );
    if (account.length) return res.status(200).json(account);
    return res.status(400).json({ message: "Account id not found" });
  }
  async create(req: Request, res: Response) {
    const account = await query.createAccount(req.body);
    res.status(201).json(account);
  }
  async delete(req: Request, res: Response) {
    const account = await query.deleteAccount(Number(req.params.pk));
    if (account)
      return res
        .status(200)
        .json({ message: "Successfully deleted information" });
    return res.status(400).json({ message: "Account id not found" });
  }
}

export default new AccountController();

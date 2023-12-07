import { Request, Response } from "express";
import { AccountKnexDBRepository } from "../repositories/accountKnexDBRepository";
import { Account } from "../models/Account";

const IS_METHOD_CREATE = true;
class AccountController {
  async findOne(req: Request, res: Response) {
    if (req.params.id !== req.context.accountId)
      return res.status(400).json({ message: "You are not the owner!" });
    const result = await new AccountKnexDBRepository().findOne({
      ...req.params,
    });
    if (result) return res.status(200).json(result);
    return res
      .status(400)
      .json({ message: "Account not found or you are not the owner!" });
  }
  async update(req: Request, res: Response) {
    const accountRepository = new AccountKnexDBRepository();
    let emailExists;
    
    
    const account = new Account(
      req.body.email,
      req.body.password,
      req.body.first_name,
      req.body.last_name,
      req.body.is_superuser,
      req.body.id_admin,
      req.body.id_active
    );
    await account.isValid();
    emailExists = await accountRepository.findOne({ email: req.body.email });

    if (emailExists && emailExists.id != req.context.accountId )
      return res.status(400).json({ message: "Email already exists!" });
    const result = await new AccountKnexDBRepository().update(
      account,
      req.params
    );
    if (result) return res.status(200).json(result);
    return res
      .status(400)
      .json({ message: "Account not found or you are not the owner!" });
  }
  async create(req: Request, res: Response) {
    const accountRepository = new AccountKnexDBRepository();
    let emailExists;
    const account = new Account(
      req.body.email,
      req.body.password,
      req.body.first_name,
      req.body.last_name,
      req.body.is_superuser,
      req.body.id_admin,
      req.body.id_active
    );
    await account.isValid(IS_METHOD_CREATE);
    emailExists = await accountRepository.findOne({ email: req.body.email });
    if (emailExists)
      return res.status(400).json({ message: "Email already exists!" });

    return res.status(201).json(await accountRepository.create(account));
  }
  async delete(req: Request, res: Response) {
    if (req.params.id !== req.context.accountId)
      return res.status(400).json({ message: "You are not the owner!" });
    await new AccountKnexDBRepository().delete(req.params);
    return res.status(200).json({ message: "Account deleted successfully" });
  }
}

export default new AccountController();

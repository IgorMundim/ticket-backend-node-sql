import { Request, Response } from "express";
import { Address } from "../models/AccountAddress";
import { AccountAddressKnexDBRepository } from "../repositories/accountAddressKnexDBRepository";

const IS_METHOD_CREATE = true;
class AccountAddressController {
  async findOne(req: Request, res: Response) {
    const result = await new AccountAddressKnexDBRepository().findOne(req.params);
    if (result) return res.status(200).json(result);
    return res
      .status(400)
      .json({ message: "Address not found!" });
  }
  async find(req: Request, res: Response) {
    // if (req.params.id !== req.context.accountId)
    //   return res.status(400).json({ message: "You are not the owner!" });
    const result = await new AccountAddressKnexDBRepository().find(req.params);
    if (result[0]) return res.status(200).json(result);
    return res
      .status(400)
      .json({ message: "ID address not found or you are not the owner!" });
  }

  async update(req: Request, res: Response) {
    const address = new Address(
      req.body.cpf,
      req.body.telephone,
      req.body.postal_code,
      req.body.complement,
      req.body.city,
      req.body.neighborhood,
      req.body.number,
      req.body.street,
      req.body.uf
    );
    address.isValid(!IS_METHOD_CREATE);
    const result = await new AccountAddressKnexDBRepository().update(address, {
      ...req.params,
      account_id: req.context.accountId,
    });
    if (result) return res.status(200).json(result);
    return res
      .status(400)
      .json({ message: "Address not found or you are not the owner!" });
  }
  async create(req: Request, res: Response) {
    const address = new Address(
      req.body.cpf,
      req.body.telephone,
      req.body.postal_code,
      req.body.complement,
      req.body.city,
      req.body.neighborhood,
      req.body.number,
      req.body.street,
      req.body.uf,
      req.params.account_id
    );

    address.isValid(IS_METHOD_CREATE);
    return res
      .status(201)
      .json(await new AccountAddressKnexDBRepository().create(address));
  }
  async delete(req: Request, res: Response) {
    const result = await new AccountAddressKnexDBRepository().delete({
      ...req.params,
      account_id: req.context.accountId,
    });
    if (result === 1)
      return res.status(200).json({ message: "Address deleted successfully" });
    return res
      .status(400)
      .json({ message: "Address not found or you are not the owner!" });
  }
}

export default new AccountAddressController();

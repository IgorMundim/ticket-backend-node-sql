import { Request, Response } from "express";
import { Card } from "../models/Card";
import { CardKnexDBRepository } from "../repositories/cardKnexDBRepository";
class CardController {
  async findOne(req: Request, res: Response) {
    const result = await new CardKnexDBRepository().findOne(req.params);
    if (result) return res.status(200).json(result);
    return res
      .status(400)
      .json({ message: "Card not found or you are not the owner!" });
  }
  async update(req: Request, res: Response) {
    const card = new Card(
      req.context.accountId,
      req.body.installment,
      req.body.type_of_payment,
      req.body.ticket_id
    );
    const result = await new CardKnexDBRepository().update(card, {
      ...req.params,
      account_id: req.context.accountId,
    });
    if (result) return res.status(200).json(result);
    return res
      .status(400)
      .json({ message: "Card not found or you are not the owner!" });
  }
  async create(req: Request, res: Response) {
    const card = new Card(
      req.context.accountId,
      req.body.installment,
      req.body.type_of_payment,
      req.body.ticket_id
    );
    return res.status(201).json(await new CardKnexDBRepository().create(card));
  }
  async delete(req: Request, res: Response) {
    const result = await new CardKnexDBRepository().delete({
      ...req.params,
      account_id: req.context.accountId,
    });
    if (result === 1)
      return res.status(200).json({ message: "Card deleted successfully" });
    return res
      .status(400)
      .json({ message: "Card not found or you are not the owner!" });
  }
}

export default new CardController();

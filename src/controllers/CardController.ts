import { Request, Response } from "express";
import { query } from "../models/Card";

class CardController {
  async index(req: Request, res: Response) {
    return res.json(await query.getCard(Number(req.params.pk)));
  }
  async update(req: Request, res: Response) {
    const address = await query.updateCard(req.body, Number(req.params.pk));
    if (address) return res.status(200).json();
    return res.status(400).json();
  }
  async create(req: Request, res: Response) {
    const address = await query.createCard(req.body);
    if (address) return res.status(200).json();
    return res.status(400).json();
  }
  async delete(req: Request, res: Response) {
    const address = await query.deleteCard(Number(req.params.pk));
    if (address) return res.status(200).json();
    return res.status(400).json();
  }
}

export default new CardController();

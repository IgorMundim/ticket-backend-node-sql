import { Request, Response } from "express";
import { query } from "../models/Order";

class OrderController {
  async index(req: Request, res: Response) {
    return res.json(await query.getOrder(Number(req.params.pk)));
  }
  async update(req: Request, res: Response) {
    const order = await query.updateOrder(req.body, Number(req.params.pk));
    if (order) return res.status(200).json();
    return res.status(400).json();
  }
  async create(req: Request, res: Response) {
    const order = await query.createOrder(req.body);
    if (order) return res.status(200).json();
    return res.status(400).json();
  }
  async delete(req: Request, res: Response) {
    const order = await query.deleteOrder(Number(req.params.pk));
    if (order) return res.status(200).json();
    return res.status(400).json();
  }
}

export default new OrderController();

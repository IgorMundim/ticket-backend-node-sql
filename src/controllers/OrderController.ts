import { Request, Response } from "express";
import { OrderKnexDBRepository } from "../repositories/orderKnexDBRepository";
class OrderController {
  async findOne(req: Request, res: Response) {
    const result = await new OrderKnexDBRepository().findOne(req.params);
    if (result) return res.status(200).json(result);
    return res.status(400).json({ message: "Order not found!" });
  }
  async find(req: Request, res: Response) {
    const result = await new OrderKnexDBRepository().find(req.params);
    if (result[0]) return res.status(200).json(result);
    return res.status(400).json({ message: "Order not found!" });
  }
  async cancel(req: Request, res: Response) {
    const result = await new OrderKnexDBRepository().cancel(req.params);
  }
}

export default new OrderController();

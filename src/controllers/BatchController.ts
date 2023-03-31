import { Request, Response } from "express";
import { query } from "../models/Batch";

class BatchController {
  async index(req: Request, res: Response) {
    return res.json(await query.getBatch(Number(req.params.pk)));
  }
  async update(req: Request, res: Response) {
    const address = await query.updateBatch(req.body, Number(req.params.pk));
    if (address) return res.status(200).json();
    return res.status(400).json();
  }
  async create(req: Request, res: Response) {
    const address = await query.createBatch(req.body);
    if (address) return res.status(200).json();
    return res.status(400).json();
  }
  async delete(req: Request, res: Response) {
    const address = await query.deleteBatch(Number(req.params.pk));
    if (address) return res.status(200).json();
    return res.status(400).json();
  }
}

export default new BatchController();

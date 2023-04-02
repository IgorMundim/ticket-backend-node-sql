import { Request, Response } from "express";
import { query } from "../models/Leasing";

class LeasingController {
  async index(req: Request, res: Response) {
    return res.json(await query.getLeasing(Number(req.params.pk)));
  }
  async update(req: Request, res: Response) {
    const leasing = await query.updateLeasing(req.body, Number(req.params.pk));
    if (leasing) return res.status(200).json();
    return res.status(400).json();
  }
  async create(req: Request, res: Response) {
    const leasing = await query.createLeasing(req.body);
    if (leasing) return res.status(200).json();
    return res.status(400).json();
  }
  async delete(req: Request, res: Response) {
    const leasing = await query.deleteLeasing(Number(req.params.pk));
    if (leasing) return res.status(200).json();
    return res.status(400).json();
  }
}

export default new LeasingController();

import { Request, Response } from "express";
import { query } from "../models/EventAddress";

class EventAddressController {
  async index(req: Request, res: Response) {
    return res.json(await query.getAddress(Number(req.params.pk)));
  }
  async update(req: Request, res: Response) {
    const address = await query.updateAddress(req.body, Number(req.params.pk));
    if (address) return res.status(200).json();
    return res.status(400).json();
  }
  async create(req: Request, res: Response) {
    const address = await query.createAddress(req.body);
    if (address) return res.status(200).json();
    return res.status(400).json();
  }
  async delete(req: Request, res: Response) {
    const address = await query.deleteAddress(Number(req.params.pk));
    if (address) return res.status(200).json();
    return res.status(400).json();
  }
}

export default new EventAddressController();

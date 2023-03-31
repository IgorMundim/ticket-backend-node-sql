import { Request, Response } from "express";
import { query } from "../models/Event";

class EventController {
  async index(req: Request, res: Response) {
     return res.json(await query.getEvent(Number(req.params.pk)));
  }
  async update(req: Request, res: Response) {
    const event = await query.updateEvent(req.body, Number(req.params.pk));
    if (event) return res.status(200).json();
    return res.status(400).json();
  }
  async create(req: Request, res: Response) {
    const account = await query.createEvent(req.body);
    if (account) return res.status(200).json();
    return res.status(400).json();
  }
  async delete(req: Request, res: Response) {
    const event = await query.deleteEvent(Number(req.params.pk));
    if (event) return res.status(200).json();
    return res.status(400).json();
  }
}

export default new EventController();

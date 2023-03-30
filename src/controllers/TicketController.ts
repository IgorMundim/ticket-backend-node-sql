import { Request, Response } from "express";
import { query } from "../models/Ticket";

class TicketController {
  async index(req: Request, res: Response) {
    const ticket = await query.getTicket(Number(req.params.pk));
    if (ticket) return res.status(200).json(ticket);
    return res.status(400).json();
  }
  async update(req: Request, res: Response) {
    const ticket = await query.updateTicket(req.body, Number(req.params.pk));
    if (ticket) return res.status(200).json();
    return res.status(400).json();
  }
  async create(req: Request, res: Response) {
    const ticket = await query.createTicket(req.body);
    if (ticket) return res.status(200).json();
    return res.status(400).json();
  }
  async delete(req: Request, res: Response) {
    const ticket = await query.deleteTicket(Number(req.params.pk));
    if (ticket) return res.status(200).json();
    return res.status(400).json();
  }
}

export default new TicketController();

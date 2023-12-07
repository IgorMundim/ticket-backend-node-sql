import { Request, Response } from "express";
import { TicketKnexDBRepository } from "../repositories/ticketKnexDBRepository";

class TicketController {
  async find(req: Request, res: Response) {
    const result = await new TicketKnexDBRepository().find(req.params);
    if(result[0]) return res.status(200).json(result)
    return res.status(400).json({message: "Ticket not found!"})
  }
  async findOne(req: Request, res: Response) {
    const result = await new TicketKnexDBRepository().findOne(req.params);
    if(result) return res.status(200).json(result)
    return res.status(400).json({message: "Ticket not found!"})
  }
}

export default new TicketController();

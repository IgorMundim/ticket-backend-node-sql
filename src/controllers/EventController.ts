import { Request, Response } from "express";
import { Event } from "../models/Event";
import { EventKnexDBRepository } from "../repositories/eventKnexDBRepository";

const IS_METHOD_CREATE = true;
class EventController {
  async findOne(req: Request, res: Response) {
    const result = await new EventKnexDBRepository().findOne(req.params);
    if (result) return res.status(200).json(result);
    return res.status(400).json({ message: "Event not found" });
  }
  async find(req: Request, res: Response) {
    const result = await new EventKnexDBRepository().find({});
    if (result) return res.status(200).json(result);
    return res.status(400).json({ message: "Events not found!" });
  }
  async update(req: Request, res: Response) {
    const event = new Event(
      req.context.accountId,
      req.body.name,
      req.body.in_room,
      req.body.date_end,
      req.body.date_start,
      req.body.description,
      req.body.is_virtual,
      req.body.video_url,
      req.body.is_published,
      req.body.id
    );
    event.isValid();
    const result = await new EventKnexDBRepository().update(event, req.params);
    if (result) return res.status(200).json(result);
    return res
      .status(400)
      .json({ message: "Event not found or you not the owner!" });
  }
  async create(req: Request, res: Response) {
    const event = new Event(
      req.context.accountId,
      req.body.name,
      req.body.in_room,
      req.body.date_end,
      req.body.date_start,
      req.body.description,
      req.body.is_virtual,
      req.body.video_url,
      req.body.is_published
    );
    event.isValid(IS_METHOD_CREATE);
    return res
      .status(201)
      .json(await new EventKnexDBRepository().create(event));
  }

  async delete(req: Request, res: Response) {
    const result = await new EventKnexDBRepository().delete({
      ...req.params,
      account_id: req.context.accountId,
    });
    if (result === 1)
      return res.status(200).json({ message: "Event deleted successfully!" });
    return res
      .status(400)
      .json({ message: "Event not found or you are not the owner!" });
  }

  // async delete(req: Request, res: Response) {

  //   const result = await new EventKnexDBRepository().delete(req.params);
  //   if (await new EventKnexDBRepository().delete(req.params))
  //     return res.status(200).json({ message: "Event deleted successfully!" });
  //   else 
  //     return res
  //       .status(400)
  //       .json({ message: "Event not found or you are not the owner!" });   
  // }
}

export default new EventController();

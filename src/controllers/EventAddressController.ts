import { Request, Response } from "express";
import { EventAddressKnexDBRepository } from "../repositories/eventAddressKnexDBRepository";
import { EventKnexDBRepository } from "../repositories/eventKnexDBRepository";
import { EventAddress } from "../models/EventAddress";
const IS_METHOD_CREATE = true;
class EventAddressController {
  async findOne(req: Request, res: Response) {
    const result = await new EventAddressKnexDBRepository().findOne(req.params);
    if (result) return res.status(200).json(result);
    return res.status(400).json({ message: "Address not found!" });
  }

  async update(req: Request, res: Response) {
    const address = new EventAddress(
      req.body.telephone,
      req.body.postal_code,
      req.body.complement,
      req.body.city,
      req.body.neighborhood,
      req.body.number,
      req.body.street,
      req.body.uf
    );
    address.isValid();

    const result = await new EventAddressKnexDBRepository().update(
      address,
      req.params
    );

    if (result) return res.status(200).json(result);
    return res.status(400).json({ message: "Address not found!" });
  }

  async create(req: Request, res: Response) {
    const address = new EventAddress(
      req.body.telephone,
      req.body.postal_code,
      req.body.complement,
      req.body.city,
      req.body.neighborhood,
      req.body.number,
      req.body.street,
      req.body.uf,
      req.params.event_id
    );
    address.isValid(IS_METHOD_CREATE);
    return res
      .status(201)
      .json(await new EventAddressKnexDBRepository().create(address));
  }
  async delete(req: Request, res: Response) {
    const result = await new EventAddressKnexDBRepository().delete(req.params);

    if (result === 1)
      return res.status(200).json({ message: "Address deleted successfully" });
  }
}

export default new EventAddressController();

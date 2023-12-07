import { NextFunction, Request, Response } from "express";
import { EventKnexDBRepository } from "../repositories/eventKnexDBRepository";
import { EventAddressKnexDBRepository } from "../repositories/eventAddressKnexDBRepository";
import { BatchKnexDBRepository } from "../repositories/batchKnexDBRepository";
import { LeasingKnexDBRepository } from "../repositories/LeasingKnexDBRepository";
import { ImageKnexDBRepository } from "../repositories/imageKnexDBRepository copy";
import { OrderKnexDBRepository } from "../repositories/orderKnexDBRepository";

class Authorization {
  isAdmin(req: Request, res: Response, next: NextFunction) {
    // if (req.context.isSuperUser === true) next();
    if (req.context.isAdmin === false)
      return res
        .status(401)
        .json({ message: "You don't have admin permission!" });
    next();
  }
  explicitOwner(req: Request, res: Response, next: NextFunction) {

    if (req.params.account_id !== req.context.accountId)
      return res.status(400).json({ message: "You are not the owner!" });
    next();
  }
  async isOwnerByEventParam(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const event = await new EventKnexDBRepository().findOne({
      id: req.params.event_id,
    });
    if (!event)
      return res
        .status(400)
        .json({ message: "You are not the owner!" });

    // if (req.context.isSuperUser === true) next();
    if (event.account_id != req.context.accountId)
      return res.status(401).json({ message: "You are not the owner!" });
    next();
  }
  async isOwnerByIdEventParam(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const event = await new EventKnexDBRepository().findOne({
      id: req.params.id,
    });
    if (!event)
      return res
        .status(400)
        .json({ message: "You are not the owner!" });

    // if (req.context.isSuperUser === true) next();
    if (event.account_id != req.context.accountId)
      return res.status(401).json({ message: "You are not the owner!" });
    next();
  }
  async isOwnerByOrderParam(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const order = await new OrderKnexDBRepository().findOne({
      id: req.params.order_id,
    });
    if (!order)
      return res
        .status(400)
        .json({ message: "Order id not found or different from param!" });

    // if (req.context.isSuperUser === true) next();
    if (order.account_id != req.context.accountId)
      return res.status(401).json({ message: "You are not the owner!" });
    next();
  }

  async isOwnerEventAddress(req: Request, res: Response, next: NextFunction) {
    const oldAddress = await new EventAddressKnexDBRepository().findOne(
      req.params
    );
    if (!oldAddress)
      return res.status(400).json({ message: "Address Id not found" });

    const event = await new EventKnexDBRepository().findOne({
      id: oldAddress.event_id,
    });

    if (!event) return res.status(400).json({ message: "Event id not found!" });

    // if (req.context.isSuperUser === true) next();
    if (event.account_id != req.context.accountId)
      return res.status(401).json({ message: "You are not the owner!" });
    next();
  }
  async isOwnerBatch(req: Request, res: Response, next: NextFunction) {
    const oldBatch = await new BatchKnexDBRepository().findOne(
      req.params
    );
    if (!oldBatch)
      return res.status(400).json({ message: "Batch Id not found" });

    const event = await new EventKnexDBRepository().findOne({
      id: oldBatch.event_id,
    });

    if (!event) return res.status(400).json({ message: "Event id not found!" });

    // if (req.context.isSuperUser === true) next();
    if (event.account_id != req.context.accountId)
      return res.status(401).json({ message: "You are not the owner!" });
    next();
  }

  async isOwnerLeasing(req: Request, res: Response, next: NextFunction) {
    const oldLeasing = await new LeasingKnexDBRepository().findOne(
      req.params
    );
    if (!oldLeasing)
      return res.status(400).json({ message: "Leasing Id not found" });

    const event = await new EventKnexDBRepository().findOne({
      id: oldLeasing.event_id,
    });

    if (!event) return res.status(400).json({ message: "Event id not found!" });

    // if (req.context.isSuperUser === true) next();
    if (event.account_id != req.context.accountId)
      return res.status(401).json({ message: "You are not the owner!" });
    next();
  }
  async isOwnerImage(req: Request, res: Response, next: NextFunction) {
    const oldImage = await new ImageKnexDBRepository().findOne(
      req.params
    );
    if (!oldImage)
      return res.status(400).json({ message: "Image Id not found" });

    const event = await new EventKnexDBRepository().findOne({
      id: oldImage.event_id,
    });

    if (!event) return res.status(400).json({ message: "Event id not found!" });

    // if (req.context.isSuperUser === true) next();
    if (event.account_id != req.context.accountId)
      return res.status(401).json({ message: "You are not the owner!" });
    next();
  }
}
export default new Authorization();

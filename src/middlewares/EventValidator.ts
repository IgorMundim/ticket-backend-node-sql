import { NextFunction, Request, Response } from "express";
import validator from "../util/Validator";
class EventValidator {
  create(req: Request, res: Response, next: NextFunction) {
    if (
      req.body.name === undefined ||
      req.body.date_start === undefined ||
      req.body.date_end === undefined
    )
      return res.status(400).json({ messageAlert: `There are empty fields!` });

    const nameIsValid = validator.name(req.body.name, "name");
    const inRoomIsValid = validator.isBollean(req.body.in_room, "in_room");
    const dateEndIsValid = validator.date(req.body.date_end, "date_end");
    const dateStartIsValid = validator.date(req.body.date_start, "date_start");
    const descriptionIsValid = validator.isNotNull(
      req.body.description,
      "description"
    );
    const videoUrlIsValid = validator.isNotNull(req.body.video_url, "url");

    const eventIsVirtualIsValid = validator.isBollean(
      req.body.is_virtual,
      "is_virtual"
    );

    const eventIsPublishedIsValid = validator.isBollean(
      req.body.is_published,
      "is_published"
    );

    if (nameIsValid) return res.status(400).json(nameIsValid);
    if (videoUrlIsValid) return res.status(400).json(videoUrlIsValid);
    if (inRoomIsValid) return res.status(400).json(inRoomIsValid);
    if (dateEndIsValid) return res.status(400).json(dateEndIsValid);
    if (dateStartIsValid) return res.status(400).json(dateStartIsValid);
    if (descriptionIsValid) return res.status(400).json(descriptionIsValid);
    if (eventIsVirtualIsValid)
      return res.status(400).json(eventIsVirtualIsValid);
    if (eventIsPublishedIsValid)
      return res.status(400).json(eventIsPublishedIsValid);

    next();
  }

  update(req: Request, res: Response, next: NextFunction) {
    const nameIsValid = validator.name(req.body.name, "name");
    const inRoomIsValid = validator.isBollean(req.body.in_room, "in_room");
    const dateEndIsValid = validator.date(req.body.date_end, "date_end");
    const dateStartIsValid = validator.date(req.body.date_start, "date_start");
    const descriptionIsValid = validator.isNotNull(
      req.body.description,
      "description"
    );
    const videoUrlIsValid = validator.isNotNull(req.body.video_url, "url");

    const eventIsVirtualIsValid = validator.isBollean(
      req.body.is_virtual,
      "is_virtual"
    );

    const eventIsPublishedIsValid = validator.isBollean(
      req.body.is_published,
      "is_published"
    );

    if (nameIsValid) return res.status(400).json(nameIsValid);
    if (videoUrlIsValid) return res.status(400).json(videoUrlIsValid);
    if (inRoomIsValid) return res.status(400).json(inRoomIsValid);
    if (dateEndIsValid) return res.status(400).json(dateEndIsValid);
    if (dateStartIsValid) return res.status(400).json(dateStartIsValid);
    if (descriptionIsValid) return res.status(400).json(descriptionIsValid);
    if (eventIsVirtualIsValid)
      return res.status(400).json(eventIsVirtualIsValid);
    if (eventIsPublishedIsValid)
      return res.status(400).json(eventIsPublishedIsValid);

    next();
  }
}
export default new EventValidator();

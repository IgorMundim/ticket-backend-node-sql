import { Request, Response } from "express";
import { Image } from "../models/Image";
import { ImageKnexDBRepository } from "../repositories/imageKnexDBRepository copy";

class ImageController {
  async find(req: Request, res: Response) {
    const result = await new ImageKnexDBRepository().find(req.params);
    if (result[0]) res.status(200).json(result)
    else
    return res.status(400).json({ message: "Image not found!" });
  }
  async update(req: Request, res: Response) {
    try{
    req.body.url = req.file?.filename;
    const image = new Image(req.body.url, req.body.alt_text, req.body.event_id);
    image.isValid();
    const result = await new ImageKnexDBRepository().update(image, req.params);
    if (result) return res.status(200).json(result);
    return res.status(400).json({ message: "Image not found!" });
    } catch (err){
      return res.status(400).json({ message: "Image not found!" });
    }
  }
  async create(req: Request, res: Response) {
    req.body.url = req.file?.filename;
    const image = new Image(
      req.body.url,
      req.body.alt_text,
      req.params.event_id
    );
    image.isValid();
    return res
      .status(201)
      .json(await new ImageKnexDBRepository().create(image));
  }
  async delete(req: Request, res: Response) {
    const result = await new ImageKnexDBRepository().delete(req.params);
    if (result === 1)
      return res.status(200).json({ message: "Image deleted successfully" });
    return res.status(400).json({ message: "Image not found" });
  }
}

export default new ImageController();

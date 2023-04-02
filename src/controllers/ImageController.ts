import { Request, Response } from "express";
import { query } from "../models/Image";

class ImageController {
  async index(req: Request, res: Response) {
    return res.json(await query.getImage(Number(req.params.pk)));
  }
  async update(req: Request, res: Response) {
    req.body.url = req.file?.filename;
    const image = await query.updateImage(req.body, Number(req.params.pk));
    if (image) return res.status(200).json();
    return res.status(400).json();
  }
  async create(req: Request, res: Response) {
    req.body.url = req.file?.filename;
    const image = await query.createImage(req.body);
    if (image) return res.status(200).json();
    return res.status(400).json();
  }
  async delete(req: Request, res: Response) {
    const image = await query.deleteImage(Number(req.params.pk));
    if (image) return res.status(200).json();
    return res.status(400).json();
  }
}

export default new ImageController();

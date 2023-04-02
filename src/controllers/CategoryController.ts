import { Request, Response } from "express";
import { query } from "../models/Category";

class CategoryController {
  async index(req: Request, res: Response) {
    const category = await query.getCategory(Number(req.params.pk));
    if (category) return res.status(200).json(category);
    return res.status(400).json();
  }
  async update(req: Request, res: Response) {
    const category = await query.updateCategory(
      req.body,
      Number(req.params.pk)
    );
    if (category) return res.status(200).json();
    return res.status(400).json();
  }
  async create(req: Request, res: Response) {
    const category = await query.createCategory(req.body);
    if (category) return res.status(200).json();
    return res.status(400).json();
  }
  async delete(req: Request, res: Response) {
    const category = await query.deleteCategory(Number(req.params.pk));
    if (category) return res.status(200).json();
    return res.status(400).json();
  }
}

export default new CategoryController();

import { Request, Response } from "express";
import { Category } from "../models/Category";
import { CategoryKnexDBRepository } from "../repositories/categoryKnexDBRepository";

class CategoryController {
  async find(req: Request, res: Response) {
    const result = await new CategoryKnexDBRepository().find();
    if (result[0]) return res.status(200).json(result);
    return res.status(400).json({ message: "Category not found!" });
  }
  async findOne(req: Request, res: Response) {
    const result = await new CategoryKnexDBRepository().findOne(req.params);
    if (result) return res.status(200).json(result);
    return res.status(400).json({ message: "ID category not found!" });
  }
  async update(req: Request, res: Response) {
    let oldCategory;
    req.body.url = req.file?.filename;
    const category = new Category(
      req.body.name,
      req.body.is_active,
      req.body.url,
      req.body.alt_text
    );
    if (req.body.name)
      oldCategory = await new CategoryKnexDBRepository().findOne({
        name: req.body.name,
      });

    if (oldCategory)
      return res.status(400).json({ message: "Name already exist" });

    const result = await new CategoryKnexDBRepository().update(
      category,
      req.params
    );
    if (result) return res.status(200).json(result);
    return res.status(400).json({ message: "Category not found!" });
  }
  async create(req: Request, res: Response) {
    req.body.url = req.file?.filename;
    const category = new Category(
      req.body.name,
      req.body.is_active,
      req.body.url,
      req.body.alt_text
    );
    category.isValid();
    const oldCategory = await new CategoryKnexDBRepository().findOne({
      name: req.body.name,
    });

    if (oldCategory)
      return res.status(400).json({ message: "Name already exist" });

    return res
      .status(201)
      .json(await new CategoryKnexDBRepository().create(category));
  }
  async delete(req: Request, res: Response) {
    const result = await new CategoryKnexDBRepository().delete(req.params);
    if (result === 1)
      return res.status(200).json({ message: "Category deleted successfully" });
    return res.status(400).json({ message: "Category not found" });
  }
}

export default new CategoryController();

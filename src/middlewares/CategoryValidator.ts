import { NextFunction, Request, Response } from "express";
import validator from "../util/Validator";

class CategoryValidator {
  isValid(req: Request, res: Response, next: NextFunction) {
    const nameIsValid = validator.name(req.body.name, "name");
    const categoryIsValid = validator.isBollean(
      req.body.is_active,
      "is_active"
    );
    const altTextIsValid = validator.isNotNull(req.body.alt_text, "alt_text");

    if (nameIsValid) return res.status(400).json(nameIsValid);
    if (categoryIsValid) return res.status(400).json(categoryIsValid);
    if (altTextIsValid) return res.status(400).json(altTextIsValid);
    next();
  }
}
export default new CategoryValidator();

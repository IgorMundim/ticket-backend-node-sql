import { NextFunction, Request, Response } from "express";
import validator from "../util/Validator";

class ImageValidator {
  isValid(req: Request, res: Response, next: NextFunction) {
    const altTextIsValid = validator.isNotNull(req.body.alt_text, "alt_text");
    if (altTextIsValid) return res.status(400).json(altTextIsValid);
    next();
  }
}
export default new ImageValidator();

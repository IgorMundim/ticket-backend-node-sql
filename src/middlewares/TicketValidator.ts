import { NextFunction, Request, Response } from "express";
import validator from "../util/Validator";

class TicketValidator {
  isValid(req: Request, res: Response, next: NextFunction) {
    const priceIsValid = validator.price(req.body.price);
    const salePriceCodeIsValid = validator.price(req.body.sale_price);
    const codeIsValid = validator.isNotNull(req.body.code, "Code");
    const studentIsValid = validator.isBollean(
      req.body.is_student,
      "is_student"
    );
    const activeIsValid = validator.isBollean(req.body.is_active, "is_active");

    if (priceIsValid) return res.status(400).json(priceIsValid);
    if (salePriceCodeIsValid) return res.status(400).json(salePriceCodeIsValid);
    if (codeIsValid) return res.status(400).json(codeIsValid);
    if (studentIsValid) return res.status(400).json(studentIsValid);
    if (activeIsValid) return res.status(400).json(activeIsValid);

    next();
  }
}
export default new TicketValidator();

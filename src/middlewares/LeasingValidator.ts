import { NextFunction, Request, Response } from "express";
import validator from "../util/Validator";

class LeasingValidator {
  isValid(req: Request, res: Response, next: NextFunction) {
    const nameIsValid = validator.isNotNull(req.body.name, "Name");
    const descriptionIsValid = validator.isNotNull(
      req.body.descroption,
      "Description"
    );
    const storePriceIsValid = validator.price(
      req.body.store_price,
      "store_price"
    );
    const salePriceCodeIsValid = validator.price(
      req.body.sale_price,
      "sale_price"
    );
    const studentPriceCodeIsValid = validator.price(
      req.body.student_price,
      "student_price"
    );

    const codeIsValid = validator.isNotNull(req.body.code, "Code");
    const studentIsValid = validator.isBollean(
      req.body.is_student,
      "is_student"
    );
    const activeIsValid = validator.isBollean(req.body.is_active, "is_active");

    if (storePriceIsValid) return res.status(400).json(storePriceIsValid);
    if (salePriceCodeIsValid) return res.status(400).json(salePriceCodeIsValid);
    if (studentPriceCodeIsValid)
      return res.status(400).json(studentPriceCodeIsValid);
    if (codeIsValid) return res.status(400).json(codeIsValid);
    if (studentIsValid) return res.status(400).json(studentIsValid);
    if (activeIsValid) return res.status(400).json(activeIsValid);
    if (nameIsValid) return res.status(400).json(nameIsValid);
    if (descriptionIsValid) return res.status(400).json(descriptionIsValid);

    next();
  }
}
export default new LeasingValidator();

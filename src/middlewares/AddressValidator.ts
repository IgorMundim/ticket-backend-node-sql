import { NextFunction, Request, Response } from "express";
import validator from "../util/Validator";

class AddressAccountValidator {
  isValid(req: Request, res: Response, next: NextFunction) {
    const cpfIsValid = validator.cpf(req.body.cpf);
    const postalCodeIsValid = validator.postalCode(req.body.postal_code);
    const telephoneIsValid = validator.telephone(req.body.telephone);
    const ufIsValid = validator.uf(req.body.uf);

    if (cpfIsValid) return res.status(400).json(cpfIsValid);
    if (postalCodeIsValid) return res.status(400).json(postalCodeIsValid);
    if (telephoneIsValid) return res.status(400).json(telephoneIsValid);
    if (ufIsValid) return res.status(400).json(ufIsValid);

    next();
  }
}
export default new AddressAccountValidator();

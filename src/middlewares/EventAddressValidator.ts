import { NextFunction, Request, Response } from "express";
import validator from "../util/Validator";

class EvemtAddressValidator {
  isValid(req: Request, res: Response, next: NextFunction) {
    const postalCodeIsValid = validator.postalCode(req.body.postal_code);
    const telephoneIsValid = validator.telephone(req.body.telephone);
    const ufIsValid = validator.uf(req.body.uf);
    const complementIsValid = validator.isNotNull(
      req.body.complement,
      "complement"
    );
    const cityIsValid = validator.isNotNull(req.body.city, "city");
    const neighborhoodIsValid = validator.isNotNull(
      req.body.neighborhood,
      "neighborhood"
    );
    const streetIsValid = validator.isNotNull(req.body.street, "street");
    const numberIsValid = validator.isNotNull(req.body.number, "number");

    if (postalCodeIsValid) return res.status(400).json(postalCodeIsValid);
    if (telephoneIsValid) return res.status(400).json(telephoneIsValid);
    if (ufIsValid) return res.status(400).json(ufIsValid);
    if (complementIsValid) return res.status(400).json(complementIsValid);
    if (cityIsValid) return res.status(400).json(cityIsValid);
    if (neighborhoodIsValid) return res.status(400).json(neighborhoodIsValid);
    if (streetIsValid) return res.status(400).json(streetIsValid);
    if (numberIsValid) return res.status(400).json(numberIsValid);

    next();
  }
}
export default new EvemtAddressValidator();

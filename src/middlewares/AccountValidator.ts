import { NextFunction, Request, Response } from "express";
import validator from "../util/Validator";
class AccountValidator {
  create(req: Request, res: Response, next: NextFunction) {
    if (
      req.body.email === undefined ||
      req.body.password === undefined ||
      req.body.first_name === undefined ||
      req.body.last_name === undefined
    )
      return res.status(400).json({ messageAlert: `There are empty fields!` });

    const emailIsValid = validator.email(req.body.email);
    const passwordIsValid = validator.password(req.body.password);
    const firstNameIsValid = validator.name(req.body.first_name, "first_name");
    const lastNameIsValid = validator.name(req.body.last_name, "last_name");

    if (emailIsValid) return res.status(400).json(emailIsValid);
    if (passwordIsValid) return res.status(400).json(passwordIsValid);
    if (firstNameIsValid) return res.status(400).json(firstNameIsValid);
    if (lastNameIsValid) return res.status(400).json(lastNameIsValid);

    next();
  }

  update(req: Request, res: Response, next: NextFunction) {
    const emailIsValid = validator.email(req.body.email);
    const passwordIsValid = validator.password(req.body.password);
    const firstNameIsValid = validator.name(req.body.fist_name, "first_name");
    const lastNameIsValid = validator.name(req.body.last_name, "last_name");

    if (emailIsValid) return res.status(400).json(emailIsValid);
    if (passwordIsValid) return res.status(400).json(passwordIsValid);
    if (firstNameIsValid) return res.status(400).json(firstNameIsValid);
    if (lastNameIsValid) return res.status(400).json(lastNameIsValid);

    next();
  }
}
export default new AccountValidator();

import { NextFunction, Request, Response } from "express";
import validator from "../util/Validator";
class BatchValidator {
  create(req: Request, res: Response, next: NextFunction) {
    if (
      req.body.percentage === undefined ||
      req.body.sales_qtd === undefined ||
      req.body.batch_stop_date === undefined
    )
      return res.status(400).json({ messageAlert: `There are empty fields!` });

    const percentageIsValid = validator.price(
      req.body.percentage,
      "percentage"
    );
    const salesQTDIsValid = validator.integer(req.body.sales_qtd, "sales_qtd");
    const stopDateIsValid = validator.date(req.body.batch_stop_date, "date");
    const descriptionIsValid = validator.isNotNull(
      req.body.description,
      "description"
    );
    const batchIsActiveIsValid = validator.isBollean(
      req.body.is_active,
      "is_active"
    );

    if (percentageIsValid) return res.status(400).json(percentageIsValid);
    if (salesQTDIsValid) return res.status(400).json(salesQTDIsValid);
    if (stopDateIsValid) return res.status(400).json(stopDateIsValid);
    if (descriptionIsValid) return res.status(400).json(descriptionIsValid);
    if (batchIsActiveIsValid) return res.status(400).json(batchIsActiveIsValid);

    next();
  }

  update(req: Request, res: Response, next: NextFunction) {
    const percentageIsValid = validator.price(
      req.body.percentage,
      "percentage"
    );
    const salesQTDIsValid = validator.integer(req.body.sales_qtd, "sales_qtd");
    const stopDateIsValid = validator.date(req.body.batch_stop_date, "date");
    const descriptionIsValid = validator.isNotNull(
      req.body.description,
      "description"
    );
    const batchIsActiveIsValid = validator.isBollean(
      req.body.is_active,
      "is_active"
    );

    if (percentageIsValid) return res.status(400).json(percentageIsValid);
    if (salesQTDIsValid) return res.status(400).json(salesQTDIsValid);
    if (stopDateIsValid) return res.status(400).json(stopDateIsValid);
    if (descriptionIsValid) return res.status(400).json(descriptionIsValid);
    if (batchIsActiveIsValid) return res.status(400).json(batchIsActiveIsValid);

    next();
  }
}
export default new BatchValidator();

import { Request, Response } from "express";
import { Batch } from "../models/Batch";
import { BatchKnexDBRepository } from "../repositories/batchKnexDBRepository";
const IS_METHOD_CREATE = true;
class BatchController {
  async find(req: Request, res: Response) {
    const result = await new BatchKnexDBRepository().find(req.params);
    if (result[0]) return res.status(200).json(result);
    return res.status(400).json({ message: "Batch not found!" });
  }
  async findOne(req: Request, res: Response) {
    const result = await new BatchKnexDBRepository().findOne(req.params);
    if (result) return res.status(200).json(result);
    return res.status(400).json({ message: "Batch not found!" });
  }
  async update(req: Request, res: Response) {
    const batch = new Batch(
      req.body.percentage,
      req.body.sales_qtd,
      req.body.batch_stop_date,
      req.body.description,
      req.body.is_active,
      req.body.event_id
    );
    batch.isValid();
    const isValidChange = await new BatchKnexDBRepository().isValidChange(
      req.body.event_id,
      req.params.id,
      req.body.sales_qtd,
      req.body.batch_stop_date
    );
    if (!isValidChange)
      return res.status(400).json({ message: "Conflict between created lots" });
    const result = await new BatchKnexDBRepository().update(batch, req.params);
    if (result) return res.status(200).json(result);
    return res.status(400).json({ message: "Batch not found!" });
  }
  async create(req: Request, res: Response) {
    try{
    const batchQuery = new BatchKnexDBRepository();
    const batch = new Batch(
      req.body.percentage,
      req.body.sales_qtd,
      req.body.batch_stop_date,
      req.body.description,
      req.body.is_active,
      req.params.event_id
    );
    batch.isValid(IS_METHOD_CREATE);
    const oldBatch = await batchQuery.filterBySales(
      req.params.event_id,
      req.body.sales_qtd,
      req.body.batch_stop_date
    );
    if (oldBatch)
      return res.status(400).json({ message: "Conflict between created lots" });
    return res.status(201).json(await batchQuery.create(batch));
    } catch (err){
      res.status(400).json({"message": ""})
    }
  }
  async delete(req: Request, res: Response) {
    const result = await new BatchKnexDBRepository().delete(req.params);
    if (result === 1)
      return res.status(200).json({ message: "Batch deleted successfully" });
  }
}

export default new BatchController();

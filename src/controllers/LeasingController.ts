import { Request, Response } from "express";
import { LeasingKnexDBRepository } from "../repositories/LeasingKnexDBRepository";
import { Leasing } from "../models/Leasing";
const IS_METHOD_CREATE = true;
class LeasingController {
  async find(req: Request, res: Response) {
    const result = await new LeasingKnexDBRepository().getLeasing(
      req.params.event_id
    );
    if (result[0]) return res.status(200).json(result);
    return res.status(400).json({ message: "Leasing not find!" });
  }
  async findOne(req: Request, res: Response) {
    console.log("invalid");
    // const result = await new LeasingKnexDBRepository().findOne(req.params);
    // if (result) return res.status(200).json(result);
    // return res.status(400).json({ message: "Leasing not find!" });
  }
  async update(req: Request, res: Response) {
    try{
    const leasing = new Leasing(
      req.body.name,
      req.body.description,
      req.body.is_active,
      req.body.store_price,
      req.body.sale_price,
      req.body.student_price,
      req.body.units_solid,
      req.body.units,
      req.body.event_id
    );

    leasing.isValid();

    const result = await new LeasingKnexDBRepository().update(
      leasing,
      req.params
    );
    if (result) return res.status(200).json(result);
    return res.status(400).json({ message: "Leasing not found!" });
    } catch (err){
      return res.status(400).json({ message: "Leasing not found!" });
    }
  }
  async create(req: Request, res: Response) {
    try{
    const leasing = new Leasing(
      req.body.name,
      req.body.description,
      req.body.is_active,
      req.body.store_price,
      req.body.sale_price,
      req.body.student_price,
      req.body.units_solid,
      req.body.units,
      req.body.event_id
    );
    leasing.isValid(IS_METHOD_CREATE);

    return res
      .status(201)
      .json(await new LeasingKnexDBRepository().create(leasing));
    } catch (err){
      return res
      .status(400)
      .json({"message": "Unable to create a lease!"});
    }
  }
  async delete(req: Request, res: Response) {
    const result = await new LeasingKnexDBRepository().delete(req.params);
    if (result === 1)
      return res.status(200).json({ message: "Leasing deleted successfully!" });
  }
}

export default new LeasingController();

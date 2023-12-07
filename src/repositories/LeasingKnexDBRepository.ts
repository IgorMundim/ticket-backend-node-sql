import { LeasingRepository, WithId } from ".";
import { Leasing } from "../models/Leasing";
import { DefaultKnexDBRepository } from "./defaultKnexDBRepository";
import { Connection } from "../provider/Connection";

export class LeasingKnexDBRepository
  extends DefaultKnexDBRepository<Leasing>
  implements LeasingRepository
{
  constructor(leasingModel = "leasing") {
    super(leasingModel);
  }
  async getLeasing(event_id: string): Promise<WithId<Leasing>[]> {
    let leases = await this.find({ event_id: event_id, is_active: true });

    let batch = await Connection.getDefault()
      .table("batch")
      .select()
      .where({ event_id: event_id })
      .andWhere("batch_stop_date", ">", new Date())
      .first();
    if (batch)
      for (let k in leases) {
        leases[k].sale_price =
          leases[k].store_price * (batch.percentage / 100 + 1);
        leases[k].student_price =
          (leases[k].store_price * (batch.percentage / 100 + 1)) / 2;
      }
    return leases;
  }
}

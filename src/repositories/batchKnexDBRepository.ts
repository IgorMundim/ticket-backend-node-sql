import { BatchRepository, WithId } from ".";
import { Batch } from "../models/Batch";
import { DefaultKnexDBRepository } from "./defaultKnexDBRepository";
import { Connection } from "../provider/Connection";

export class BatchKnexDBRepository
  extends DefaultKnexDBRepository<Batch>
  implements BatchRepository
{
  constructor(batchModel = "batch") {
    super(batchModel);
  }
  async filterBySales(
    event_id: string,
    salesQtd: number,
    batchStopDate: Date
  ): Promise<WithId<Batch> | undefined> {
    return await Connection.getDefault()
      .table("batch")
      .select()
      .where("event_id", event_id)
      .andWhere(function () {
        this.where("sales_qtd", ">=", salesQtd).orWhere(
          "batch_stop_date",
          ">=",
          batchStopDate
        );
      })
      .first();
  }

  async isValidChange(
    event_id: string,
    id: string,
    salesQtd: number,
    batchStopDate: Date
  ): Promise<boolean | undefined> {
    const batches = await this.find({ event_id: event_id });
    let isNotValid = true;

    for (let k in batches) {
      if (
        Number(batches[k].id) < Number(id) &&
        (batches[k].sales_qtd >= salesQtd ||
          batches[k].batch_stop_date >= new Date(batchStopDate))
      ) {
        isNotValid = false;
      } else if (
        Number(batches[k].id) > Number(id) &&
        (batches[k].sales_qtd <= salesQtd ||
          batches[k].batch_stop_date <= new Date(batchStopDate))
      ) {
        isNotValid = false;
      }
    }
    return isNotValid;
  }
}

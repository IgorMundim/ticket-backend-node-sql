import { Connection } from "../provider/Connection";
export interface Batch {
  id: string;
  percentage: number;
  sales_qtd: number;
  batch_stop_date: Date;
  description: string;
  is_active: string;
  event_id: string;
  created_at: Date;
  updated_at: Date;
}

export const getBatch = async (pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("batch")
    .select()
    .where({ event_id: pk });
};

export const createBatch = async (batch: Batch) => {
  return await Connection.getProductionEnvironment()
    .table("batch")
    .insert(batch);
};

export const updateBatch = async (batch: Batch, pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("batch")
    .where({ id: pk })
    .update(batch);
};

export const deleteBatch = async (pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("batch")
    .where({ id: pk })
    .del();
};

export const query = {
  getBatch,
  updateBatch,
  createBatch,
  deleteBatch,
};

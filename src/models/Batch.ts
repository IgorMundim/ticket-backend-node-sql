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
  try {
    return await Connection.getProductionEnvironment()
      .table("batch")
      .select()
      .where({ event_id: pk });
  } catch (e) {
    Error;
  }
};

export const createBatch = async (batch: Batch) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("batch")
      .insert(batch);
  } catch (e) {
    Error;
  }
};

export const updateBatch = async (batch: Batch, pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("batch")
      .where({ id: pk })
      .update(batch);
  } catch (e) {
    return null;
  }
};

export const deleteBatch = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("batch")
      .where({ id: pk })
      .del();
  } catch (e) {
    Error;
  }
};

export const query = {
  getBatch,
  updateBatch,
  createBatch,
  deleteBatch,
};

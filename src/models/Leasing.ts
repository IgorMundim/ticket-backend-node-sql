import { Connection } from "../provider/Connection";
export interface Leasing {
  id: number;
  name: string;
  descroption: string;
  is_active: boolean;
  store_price: number;
  sale_price: number;
  student_price: string;
  units_solid: number;
  units: string;
  event_id: string;
}

export const getLeasing = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("leasing")
      .select()
      .where({ event_id: pk });
  } catch (e) {
    Error;
  }
};

export const createLeasing = async (leasing: Leasing) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("leasing")
      .insert(leasing);
  } catch (e) {
    Error;
  }
};

export const updateLeasing = async (leasing: Leasing, pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("leasing")
      .where({ id: pk })
      .update(leasing);
  } catch (e) {
    return null;
  }
};

export const deleteLeasing = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("leasing")
      .where({ id: pk })
      .del();
  } catch (e) {
    Error;
  }
};

export const query = {
  getLeasing,
  updateLeasing,
  createLeasing,
  deleteLeasing,
};

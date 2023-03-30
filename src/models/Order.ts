import { Connection } from "../provider/Connection";
export enum Payment {
  credit,
  pix,
}
export interface Order {
  id: string;
  pay_time: string;
  is_paid: boolean;
  installment: number;
  type_of_payment: Payment;
  created_at: Date;
  updated_at: Date;
}

export const getOrder = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("order")
      .select()
      .where({ id: pk });
  } catch (e) {
    Error;
  }
};

export const createOrder = async (order: Order) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("order")
      .insert(order);
  } catch (e) {
    Error;
  }
};

export const updateOrder = async (order: Order, pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("order")
      .where({ id: pk })
      .update(order);
  } catch (e) {
    return null;
  }
};

export const deleteOrder = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("order")
      .where({ id: pk })
      .del();
  } catch (e) {
    Error;
  }
};

export const query = {
  getOrder,
  updateOrder,
  createOrder,
  deleteOrder,
};

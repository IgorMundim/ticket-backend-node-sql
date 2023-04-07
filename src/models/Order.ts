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
  return await Connection.getProductionEnvironment()
    .table("order")
    .select()
    .where({ id: pk });
};

export const createOrder = async (order: Order) => {
  return await Connection.getProductionEnvironment()
    .table("order")
    .insert(order);
};

export const updateOrder = async (order: Order, pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("order")
    .where({ id: pk })
    .update(order);
};

export const deleteOrder = async (pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("order")
    .where({ id: pk })
    .del();
};

export const query = {
  getOrder,
  updateOrder,
  createOrder,
  deleteOrder,
};

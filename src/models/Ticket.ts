import { Connection } from "../provider/Connection";
export interface Address {
  id: string;
  price: number;
  sale_price: number;
  code: string;
  is_student: boolean;
  is_active: boolean;
  units: number;
  event_id: number;
  leasing_id: number;
  order_id: number;
  created_at: Date;
  updated_at: Date;
}

export const getTicket = async (pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("ticket")
    .select()
    .where({ order_id: pk });
};

export const createTicket = async (ticket: Address) => {
  return await Connection.getProductionEnvironment()
    .table("ticket")
    .insert(ticket);
};

export const updateTicket = async (ticket: Address, pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("ticket")
    .where({ id: pk })
    .update(ticket);
};

export const deleteTicket = async (pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("ticket")
    .where({ id: pk })
    .del();
};

export const query = {
  getTicket,
  updateTicket,
  createTicket,
  deleteTicket,
};

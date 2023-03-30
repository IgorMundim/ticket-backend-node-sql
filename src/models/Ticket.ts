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
  try {
    return await Connection.getProductionEnvironment()
      .table("ticket")
      .select()
      .where({ order_id: pk });
  } catch (e) {
    Error;
  }
};

export const createTicket = async (ticket: Address) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("ticket")
      .insert(ticket);
  } catch (e) {
    Error;
  }
};

export const updateTicket = async (ticket: Address, pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("ticket")
      .where({ id: pk })
      .update(ticket);
  } catch (e) {
    return null;
  }
};

export const deleteTicket = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("ticket")
      .where({ id: pk })
      .del();
  } catch (e) {
    Error;
  }
};

export const query = {
  getTicket,
  updateTicket,
  createTicket,
  deleteTicket,
};

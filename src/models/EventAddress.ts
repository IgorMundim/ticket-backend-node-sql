import { Connection } from "../provider/Connection";
export interface Address {
  id: string;
  cpf: string;
  telephone: string;
  postal_code: string;
  complement: string;
  city: string;
  neighborhood: string;
  number: string;
  street: string;
  uf: string;
  event_id: string;
  created_at: Date;
  updated_at: Date;
}

export const getAddress = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("event_address")
      .select()
      .where({ event_id: pk });
  } catch (e) {
    Error;
  }
};

export const createAddress = async (address: Address) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("event_address")
      .insert(address);
  } catch (e) {
    Error;
  }
};

export const updateAddress = async (address: Address, pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("event_address")
      .where({ id: pk })
      .update(address);
  } catch (e) {
    return null;
  }
};

export const deleteAddress = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("event_address")
      .where({ id: pk })
      .del();
  } catch (e) {
    Error;
  }
};

export const query = {
  getAddress,
  updateAddress,
  createAddress,
  deleteAddress,
};

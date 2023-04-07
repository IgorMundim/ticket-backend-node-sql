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
  account_id: string;
  created_at: Date;
  updated_at: Date;
}

export const getAddress = async (pk: number) => {
    return await Connection.getProductionEnvironment()
      .table("address")
      .select()
      .where({ account_id: pk });
};

export const createAddress = async (address: Address) => {
    return await Connection.getProductionEnvironment()
      .table("address")
      .insert(address);
};

export const updateAddress = async (address: Address, pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("address")
      .where({ id: pk })
      .update(address);
  } catch (e) {
    console.log("aqu");
    return null;
  }
};

export const deleteAddress = async (pk: number) => {
    return await Connection.getProductionEnvironment()
      .table("address")
      .where({ id: pk })
      .del();
};

export const query = {
  getAddress,
  updateAddress,
  createAddress,
  deleteAddress,
};

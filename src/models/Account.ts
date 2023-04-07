import { Connection } from "../provider/Connection";
import { hash } from "bcrypt";
export interface Account {
  id: string;
  email: string;
  password: string;
  last_login: string;
  fist_name: string;
  last_name: string;
  is_superuser: boolean;
  is_admin: boolean;
  is_active: boolean;
  resetToken: boolean;
  resetTokenExpiration: string;
  created_at: Date;
  updated_at: Date;
}

export const getAccount = async (pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("account")
    .select()
    .where({ id: pk })
    .first();
};

export const createAccount = async (account: Account) => {
  account.password = await hash(account.password, 8);
  return await Connection.getProductionEnvironment()
    .table("account")
    .insert(account);
};

export const updateAccount = async (account: Account, pk: number) => {
  account.password = await hash(account.password, 8);
  return await Connection.getProductionEnvironment()
    .table("account")
    .where({ id: pk })
    .update(account);
};

export const deleteAccount = async (pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("account")
    .where({ id: pk })
    .del();
};

export const query = {
  getAccount,
  updateAccount,
  createAccount,
  deleteAccount,
};

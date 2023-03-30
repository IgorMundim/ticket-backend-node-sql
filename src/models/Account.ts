import { Connection } from "../provider/Connection";
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
  try {
    return await Connection.getProductionEnvironment()
      .table("account")
      .select()
      .where({ id: pk });
  } catch (e) {
    Error;
  }
};

export const createAccount = async (account: Account) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("account")
      .insert(account);
  } catch (e) {
    Error;
  }
};

export const updateAccount = async (account: Account, pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("account")
      .where({ id: pk })
      .update(account);
  } catch (e) {
    return null;
  }
};

export const deleteAccount = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("account")
      .where({ id: pk })
      .del();
  } catch (e) {
    Error;
  }
};

export const query = {
    getAccount,
    updateAccount,
    createAccount,
    deleteAccount,
  };
  
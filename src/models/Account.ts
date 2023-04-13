import { Connection } from "../provider/Connection";
import { hash } from "bcrypt";
import { BadRequestError } from "../util/ApiError";
export interface IAccount {
  id?: number;
  email?: string;
  password?: string;
  last_login?: Date;
  first_name?: string;
  last_name?: string;
  is_superuser?: boolean;
  is_admin?: boolean;
  is_active?: boolean;
  resetToken?: boolean;
  resetTokenExpiration?: string;
  created_at?: Date;
  updated_at?: Date;
}
class Account {
  async getAccount(pk: number) {
    return await Connection.getDefault()
      .table("account")
      .select(
        "id",
        "email",
        "last_login",
        "first_name",
        "last_name",
        "is_superuser",
        "is_admin",
        "is_active",
        "created_at",
        "updated_at"
      )
      .where({ id: pk })
      .first();
  }

  async createAccount({
    email,
    first_name,
    password,
    last_name,
    is_superuser,
    is_admin,
  }: IAccount) {
    let newPassword;

    if (await this.hasEmail(email as string))
      throw new BadRequestError("Email already exists!");

    if (password) newPassword = await hash(password, 8);

    return await Connection.getDefault()
      .table("account")
      .insert({
        email,
        last_login: Date(),
        last_name,
        first_name,
        password: newPassword,
        is_superuser,
        is_admin,
      })
      .returning([
        "id",
        "email",
        "last_login",
        "first_name",
        "last_name",
        "is_superuser",
        "is_admin",
        "is_active",
        "created_at",
        "updated_at",
      ]);
  }

  async updateAccount(
    {
      email,
      first_name,
      password,
      last_name,
      is_superuser,
      is_admin,
      is_active,
    }: IAccount,
    pk: number
  ) {
    let newPassword;
    if (email)
      if (await this.hasEmail(email as string))
        throw new BadRequestError("Email already exists!");
    if (password) newPassword = await hash(password, 8);
    return await Connection.getDefault()
      .table("account")
      .where({ id: pk })
      .update({
        email,
        last_login: Date(),
        last_name,
        first_name,
        password: newPassword,
        is_superuser,
        is_admin,
        is_active,
      })
      .returning([
        "id",
        "email",
        "last_login",
        "first_name",
        "last_name",
        "is_superuser",
        "is_admin",
        "is_active",
        "created_at",
        "updated_at",
      ]);
  }

  async deleteAccount(pk: number) {
    return await Connection.getDefault()
      .table("account")
      .where({ id: pk })
      .del();
  }
  async hasEmail(email: string) {
    return await Connection.getDefault()
      .table("account")
      .select()
      .where({ email: email })
      .first();
  }
}
export default new Account();

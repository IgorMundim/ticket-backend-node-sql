import  dayjs from "dayjs";
import { Connection } from "./Connection";

class GenerateRefreshToken {
  async execute(account_id: string) {
    const aleatory = () => Math.floor(Math.random() * 10000 + 10000);
    const token = `${Date.now()}_${aleatory()}_${aleatory()}.${aleatory()}`;
    const expiresIn = dayjs().add(10, "hours").unix();
    const refreshToken = await Connection.getDefault()
      .table("refresh_token")
      .select()
      .where({ account_id: account_id })
      .first();

    refreshToken
      ? await Connection.getDefault()
          .table("refresh_token")
          .where({ account_id: account_id })
          .update({ token: token, expire_in: expiresIn })
      : await Connection.getDefault()
          .table("refresh_token")
          .insert({ expire_in: expiresIn, account_id, token: token });

    return {
      refreshToken: {
        expiresIn: expiresIn,
        account_id: account_id,
        token: token,
      },
    };
  }
}

export default new GenerateRefreshToken();

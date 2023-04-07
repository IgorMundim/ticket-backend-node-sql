import { compare } from "bcrypt";
import { Connection } from "../provider/Connection";
import generateRefreshToken from "../provider/GenerateRefreshToken";
import generateTokenProvider from "../provider/GenerateTokenProvider";
import dayjs = require("dayjs");
interface Authenticate {
  email: string;
  password: string;
}

class Authenticate {
  async login({ email, password }: Authenticate) {
    const accountAlreadyExists = await Connection.getProductionEnvironment()
      .table("account")
      .select()
      .where({ email: email })
      .first();

    if (!accountAlreadyExists) {
      throw new Error("Account or password incorrect");
    }

    const passwordMatch = await compare(
      password,
      accountAlreadyExists.password
    );

    if (!passwordMatch) {
      throw new Error("User or password incorrect");
    }

    const token = await generateTokenProvider.execute(accountAlreadyExists.id);

    const refreshToken = await generateRefreshToken.execute(
      accountAlreadyExists.id
    );

    return { token, refreshToken };
  }
  async refreshToken(token: string) {
    let newRefreshToken;

    const data = await Connection.getProductionEnvironment()
      .table("refresh_token")
      .select()
      .where({ token: token })
      .first();

    if (!data) {
      throw new Error("Refresh token invalid");
    }
    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(data.expires_in));
    console.log(refreshTokenExpired);
    if (refreshTokenExpired) {
      newRefreshToken = await generateRefreshToken.execute(data.account_id);
    }
    const newToken = await generateTokenProvider.execute(data.account_id);
    console.log(newRefreshToken);
    return { newToken, newRefreshToken };
  }
}

export default new Authenticate();

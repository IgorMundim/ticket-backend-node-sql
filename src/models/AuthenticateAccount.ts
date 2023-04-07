import { compare } from "bcrypt";
import { Connection } from "../provider/Connection";
import generateTokenProvider from "../provider/GenerateTokenProvider";
import dayjs = require("dayjs");
import { UnauthorizedError } from "../util/ApiError";
interface Authenticate {
  email: string;
  password: string;
}

class Authenticate {
  async create(account_id: string) {
    const aleatory = () => Math.floor(Math.random() * 10000 + 10000);
    const token = `${Date.now()}_${aleatory()}_${aleatory()}.${aleatory()}`;
    const expiresIn = dayjs().add(10, "seconds").unix();
    const refreshToken = await Connection.getProductionEnvironment()
      .table("refresh_token")
      .select()
      .where({ account_id: account_id })
      .first();

    refreshToken
      ? await Connection.getProductionEnvironment()
          .table("refresh_token")
          .where({ account_id: account_id })
          .update({ token: token, expire_in: expiresIn })
      : await Connection.getProductionEnvironment()
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
  async login({ email, password }: Authenticate) {
    const accountAlreadyExists = await Connection.getProductionEnvironment()
      .table("account")
      .select()
      .where({ email: email })
      .first();

    if (!accountAlreadyExists) {
      throw new UnauthorizedError("Account or password incorrect");
    }

    const passwordMatch = await compare(
      password,
      accountAlreadyExists.password
    );

    if (!passwordMatch) {
      throw new UnauthorizedError("User or password incorrect");
    }

    const token = await generateTokenProvider.execute(accountAlreadyExists.id);

    const refreshToken = await this.create(accountAlreadyExists.id);

    return { token, refreshToken };
  }
  async refreshToken(token: string) {
    let refreshToken;

    const data = await Connection.getProductionEnvironment()
      .table("refresh_token")
      .select()
      .where({ token: token })
      .first();

    if (!data) {
      throw new UnauthorizedError("Refresh token invalid");
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(data.expire_in));
    refreshTokenExpired
      ? (refreshToken = await this.create(data.account_id))
      : (refreshToken = {
          refreshToken: {
            expiresIn: data.expire_in,
            account_id: data.account_id,
            token: data.token,
          },
        });

    const newToken = await generateTokenProvider.execute(data.account_id);
    return { newToken, ...refreshToken };
  }
}

export default new Authenticate();

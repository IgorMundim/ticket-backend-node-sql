import { compare } from "bcrypt";
import { Connection } from "../provider/Connection";
import generateTokenProvider from "../provider/GenerateTokenProvider";
import dayjs = require("dayjs");
import { UnauthorizedError } from "../util/ApiError";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateSessionInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: default@default.com
 *        password:
 *          type: string
 *          default: Abc1234#
 *    CreateSessionResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *        refreshToken:
 *           type: object
 *           properties:
 *             expiresIn:
 *               type: string
 *             account_id:
 *               type: string
 *             token:
 *               type: string
 *          
 *             
 */ 
interface Authenticate {
  email: string;
  password: string;
}

class Authenticate {
  async createRefreshToken(account_id: string) {
    const aleatory = () => Math.floor(Math.random() * 10000 + 10000);
    const token = `${Date.now()}_${aleatory()}_${aleatory()}.${aleatory()}`;
    const expiresIn = dayjs().add(10, "h").unix();
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
  async login({ email, password }: Authenticate) {
    const accountAlreadyExists = await Connection.getDefault()
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

    const token = await generateTokenProvider.execute(accountAlreadyExists);

    const refreshToken = await this.createRefreshToken(accountAlreadyExists.id);

    return { token, ...refreshToken };
  }
  async refreshToken(token: string) {
    let refreshToken;

    const data = await Connection.getDefault()
      .table("refresh_token")
      .select()
      .where({ token: token })
      .first();

    const account = await Connection.getDefault()
      .table("account")
      .select()
      .where({ id: data.account_id })
      .first();

    if (!data) {
      throw new UnauthorizedError("Refresh token invalid");
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(data.expire_in));
    refreshTokenExpired
      ? (refreshToken = await this.createRefreshToken(data.account_id))
      : (refreshToken = {
          refreshToken: {
            expiresIn: data.expire_in,
            account_id: data.account_id,
            token: data.token,
          },
        });

    const newToken = await generateTokenProvider.execute(account);
    return { token: newToken, ...refreshToken };
  }
}

export default new Authenticate();

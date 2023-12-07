import { sign } from "jsonwebtoken";
interface IAccount {
  id: string;
  is_admin: boolean;
  is_superuser: boolean;
  is_active: boolean;
}
class GenerateTokenProvider {
  async execute(account: IAccount) {
    const token = sign(
      {
        isAdmin: account.is_admin,
        isSuperUser: account.is_superuser,
        isActive: account.is_active,
      },
      String(process.env.SECRET),
      {
        subject: account.id.toString(),
        expiresIn: "1h",
      }
    );
    return token;
  }
}

export default new GenerateTokenProvider();

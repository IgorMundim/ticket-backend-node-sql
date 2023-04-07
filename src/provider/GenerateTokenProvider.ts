import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
  async execute(accountId: string) {
    const token = sign({}, "123", {
      subject: accountId.toString(),
      expiresIn: "50s",
    });
    return token;
  }
}

export default new GenerateTokenProvider();

import * as request from "supertest";
import app from "../../index";

describe("Account - Middleware", () => {
  test("should  not accept name, first_name, last_name and password with null", async () => {
    const result = await request(app).post(`/api/v1/account/`).send({});
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual('{"messageAlert":"There are empty fields!"}');
  });
  test("should  not accept invalid password", async () => {
    const result = await request(app).post(`/api/v1/account/`).send({
      email: "emailstart@email.com",
      first_name: "firstname",
      last_name: "lastname",
      password: "123456",
    });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual('{"messageAlert":"Invalid password!"}');
  });
});

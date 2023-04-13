import { testServer } from "../jest.setup";
import { Connection } from "../../src/provider/Connection";

describe("Account - Middleware", () => {
  beforeAll(async () => {
    await Connection.getEnvironmentTest().table("account").del();
  });
  test("should  not accept name, first_name, last_name and password with null", async () => {
    const result = await testServer.post(`/api/v1/account/`).send({});
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual('{"messageAlert":"There are empty fields!"}');
  });
  test.skip("should  not accept invalid password", async () => {
    const result = await testServer.post(`/api/v1/account/`).send({
      email: "emailstart@email.com",
      first_name: "firstname",
      last_name: "lastname",
      password: "Abc123456",
    });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual('{"messageAlert":"Invalid password!"}');
  });
  test("should  not accept email", async () => {
    const result = await testServer.post(`/api/v1/account/`).send({
      email: "emailstartemail.com",
      first_name: "firstname",
      last_name: "lastname",
      password: "@Abc123456",
    });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual('{"messageAlert":"Invalid email!"}');
  });
  test("should  not accept first_name", async () => {
    const result = await testServer.post(`/api/v1/account/`).send({
      email: "email@email.com",
      first_name: "",
      last_name: "lastname",
      password: "@Abc123456",
    });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual('{"messageAlert":"Invalid first_name!"}');
  });

  test("should  not accept last_name", async () => {
    const result = await testServer.post(`/api/v1/account/`).send({
      email: "email@email.com",
      first_name: "first_name",
      last_name: "",
      password: "@Abc123456",
    });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual('{"messageAlert":"Invalid first_name!"}');
  });
});

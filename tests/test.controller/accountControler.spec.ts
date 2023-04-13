import accont, { IAccount } from "../../src/models/Account";
import { Connection } from "../../src/provider/Connection";
import { testServer } from "../jest.setup";

describe("Account - Controler", () => {
  let startAccount: IAccount[];
  beforeAll(async () => {
    await Connection.getEnvironmentTest().table("account").del();
    startAccount = await accont.createAccount({
      email: "emailstart@email.com",
      password: "@Abc12345",
      first_name: "start_first_name",
      last_name: "start_last_name",
      is_superuser: false,
      is_admin: false,
      is_active: true,
    });
  });
  test("should recover account - GET", async () => {
    const result = await testServer.get(
      `/api/v1/account/${startAccount[0].id}`
    );
    expect(result.statusCode).toEqual(200);
    expect(result.body).toStrictEqual(
      expect.objectContaining({
        email: "emailstart@email.com",
        first_name: "start_first_name",
        last_name: "start_last_name",
        is_superuser: false,
        is_admin: false,
        is_active: true,
      })
    );
  });
  test("should recover error message - GET", async () => {
    const result = await testServer.get(`/api/v1/account/0`);
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual('{"message":"Account not found"}');
  });

  test("should create account - POST", async () => {
    const account = {
      email: "email@email.com",
      password: "@Abc12345",
      first_name: "firstname",
      last_name: "lastname",
      is_superuser: false,
      is_admin: false,
      is_active: true,
    };
    const result = await testServer.post(`/api/v1/account`).send(account);

    expect(result.body[0]).toStrictEqual(
      expect.objectContaining({
        email: "email@email.com",
        first_name: "firstname",
        last_name: "lastname",
        is_superuser: false,
        is_admin: false,
        is_active: true,
      })
    );
    expect(result.statusCode).toEqual(201);
  });

  test("should not create with same email - POST", async () => {
    const account = {
      email: "email@email.com",
      password: "@Abc12345",
      first_name: "firstname",
      last_name: "lastname",
      is_superuser: false,
      is_admin: false,
      is_active: true,
    };
    const result = await testServer.post(`/api/v1/account`).send(account);
    expect(result.text).toEqual('{"message":"Email already exists!"}');
    expect(result.statusCode).toEqual(400);
  });

  test("should update account - PATCH", async () => {
    const account = {
      email: "change@email.com",
      first_name: "firstnamechanged",
      last_name: "lastnamechanged",
      is_superuser: true,
      is_admin: true,
      is_active: false,
    };
    const result = await testServer
      .patch(`/api/v1/account/${startAccount[0].id}`)
      .send(account);

    expect(result.body[0]).toStrictEqual(
      expect.objectContaining({
        email: "change@email.com",
        first_name: "firstnamechanged",
        last_name: "lastnamechanged",
        is_superuser: true,
        is_admin: true,
        is_active: false,
      })
    );
    expect(result.statusCode).toEqual(200);
  });

  test("should not update with same email - PATCH", async () => {
    const account = {
      email: "change@email.com",
      password: "@Abc12345",
      first_name: "firstname",
      last_name: "lastname",
      is_superuser: false,
      is_admin: false,
      is_active: true,
    };
    const result = await testServer
      .patch(`/api/v1/account/${startAccount[0].id}`)
      .send(account);
    expect(result.text).toEqual('{"message":"Email already exists!"}');
    expect(result.statusCode).toEqual(400);
  });

  test("should not update account - PATCH", async () => {
    const account = {
      first_name: "firstnamechanged",
      last_name: "lastnamechanged",
      is_superuser: true,
      is_admin: true,
      is_active: false,
    };

    const result = await testServer.patch(`/api/v1/account/0`).send(account);
    expect(result.text).toEqual('{"message":"Account id not found"}');
    expect(result.statusCode).toEqual(400);
  });

  test("should delete account - DELETE", async () => {
    const result = await testServer.delete(
      `/api/v1/account/${startAccount[0].id}`
    );
    expect(result.text).toEqual(
      '{"message":"Successfully deleted information"}'
    );
    expect(result.statusCode).toEqual(200);
  });

  test("should not delete account - DELETE", async () => {
    const result = await testServer.delete(
      `/api/v1/account/${startAccount[0].id}`
    );
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual('{"message":"Account id not found"}');
  });
});

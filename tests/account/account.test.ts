import { testServer } from "../jest.setup";
import { AccountAddressKnexDBRepository } from "../../src/repositories/accountAddressKnexDBRepository";

import { Account } from "../../src/models/Account";
import { AccountKnexDBRepository } from "../../src/repositories/accountKnexDBRepository";



describe("Account - Controller", () => {
  let defaultAccountId = ''
  let defaultAccountToken = ''

  beforeAll(async function (){
    const defaultAccount = new Account(
      "accountControler@email.com",
      "@Abc12345",
      "first",
      "last",
      false,
      false,
      true
    );
  await defaultAccount.isValid(true)
  const accountRepository = new AccountKnexDBRepository();
  await accountRepository.create(defaultAccount);

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
    let result = await testServer.post(`/api/v1/account`).send(account);

    expect(result.body).toEqual(
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
    const getCredential = await testServer.post("/api/v1/account/login").send({
      email: "email@email.com",
      password: "@Abc12345",
    });
  
    defaultAccountId = getCredential.body.refreshToken.account_id;
    defaultAccountToken = getCredential.body.token
  });

  test("should recover account - GET", async () => {


    const result = await testServer.get(
      `/api/v1/account/${ defaultAccountId}`
    ).set("Authorization", `Bearer ${defaultAccountToken}`);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(
      expect.objectContaining({
        email: "email@email.com",
        first_name: "firstname",
        last_name: "lastname",
        is_superuser: false,
        is_admin: false,
        is_active: true,
       })
    );
  });

  test("should recover error message - GET", async () => {
    const result = await testServer.get(`/api/v1/account/0`);
    expect(result.statusCode).toEqual(401);
    expect(result.text).toEqual('{"message":"Token is missing"}');
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
      .patch(`/api/v1/account/${defaultAccountId}`)
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      .send(account);

      expect(result.statusCode).toEqual(200);
      expect(result.body).toEqual(
        expect.objectContaining({      
          email: "change@email.com",
          first_name: "firstnamechanged",
          last_name: "lastnamechanged"
      })
    )
  });
  test("should update with same email - PATCH", async () => {

    const account = {
      email: "change@email.com",
      first_name: "firstname",
      last_name: "lastname",
      is_superuser: false,
      is_admin: false,
      is_active: true,
    };
    const result = await testServer
      .patch(`/api/v1/account/${defaultAccountId}`)
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      .send(account);
    
    expect(result.statusCode).toEqual(200);
  });

  test("should not update existent email - PATCH", async () => {
    const account = {
      email: "accountControler@email.com",
      password: "@Abc12345",
      first_name: "firstname",
      last_name: "lastname",
      is_superuser: false,
      is_admin: false,
      is_active: true,
    };

    const result = await testServer
      .patch(`/api/v1/account/${defaultAccountId}`)
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      .send(account);

    expect(result.statusCode).toEqual(400);
  });

  test("should not delete account - DELETE", async () => {
    const accountDefault = await testServer.post("/api/v1/account/login").send({
      email: "accountControler@email.com",
      password: "@Abc12345",

    });

    const result = await testServer.delete(`/api/v1/account/${defaultAccountId}`)
    .set("Authorization", `Bearer ${accountDefault.body.token}`)
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual('{"message":"You are not the owner!"}');
  });
  
  test("should not delete account without token - DELETE", async () => {
    const result = await testServer.delete(`/api/v1/account/0`);
    expect(result.statusCode).toEqual(401);
    expect(result.text).toEqual('{"message":"Token is missing"}');
  });

  test("should delete account - DELETE", async () => {

    const result = await testServer.delete(
      `/api/v1/account/${defaultAccountId}`
    ).set("Authorization", `Bearer ${defaultAccountToken}`)
    expect(result.text).toEqual(
      '{"message":"Account deleted successfully"}'
    );
    expect(result.statusCode).toEqual(200);
  });

 });

import accont, { IAccount } from "../../src/models/Account";
import { Connection } from "../../src/provider/Connection";
describe("Model - Account", () => {
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

  test("should retrieve nothing", async () => {
    const getAccount = await accont.getAccount(99);
    expect(await getAccount).toBeUndefined();
  });
  test("should create a new account", async () => {
    const newAccount: IAccount[] = await accont.createAccount({
      email: "email@email.com",
      password: "@Abc12345",
      first_name: "first_name",
      last_name: "last_name",
      is_superuser: false,
      is_admin: false,
      is_active: true,
    });
    expect(newAccount[0]).toStrictEqual(
      expect.objectContaining({
        email: "email@email.com",
      })
    );
  });
  test("should try to create a new account with the same email", async () => {
    await expect(
      accont.createAccount({
        email: "email@email.com",
        password: "@Abc12345",
        first_name: "first_name",
        last_name: "last_name",
        is_superuser: false,
        is_admin: false,
        is_active: true,
      })
    ).rejects.toThrow();
  });

  test("should retrieve something", async () => {
    const getAccount = await accont.getAccount(Number(startAccount[0].id));
    expect(await getAccount).toStrictEqual(
      expect.objectContaining({ email: "emailstart@email.com" })
    );
  });

  test("should update a account", async () => {
    const newAccount: IAccount[] = await accont.updateAccount(
      {
        email: "updatedemail@email.com",
        password: "@Abc12345",
        first_name: "first_name",
        last_name: "last_name",
        is_superuser: true,
        is_admin: true,
        is_active: true,
      },
      Number(startAccount[0].id)
    );
    expect(newAccount[0]).toStrictEqual(
      expect.objectContaining({
        email: "updatedemail@email.com",
      })
    );
  });
});

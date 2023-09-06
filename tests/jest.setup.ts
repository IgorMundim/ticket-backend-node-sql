import supertest from "supertest";
import { Connection } from "../src/provider/Connection";
import server from "../src/server";
import { AccountKnexDBRepository } from "../src/repositories/accountKnexDBRepository";
import { AccountAddressKnexDBRepository } from "../src/repositories/accountAddressKnexDBRepository";
import { Account } from "../src/models/Account";
import { CategoryKnexDBRepository } from "../src/repositories/categoryKnexDBRepository";
import { EventKnexDBRepository } from "../src/repositories/eventKnexDBRepository"
import { EventAddressKnexDBRepository } from "../src/repositories/eventAddressKnexDBRepository"
import { BatchKnexDBRepository } from "../src/repositories/batchKnexDBRepository"
import { LeasingKnexDBRepository } from "../src/repositories/LeasingKnexDBRepository"

beforeAll(async () => {
  await new AccountKnexDBRepository().delete({});
  await new AccountAddressKnexDBRepository().delete({});
  await new CategoryKnexDBRepository().delete({})
  await new EventKnexDBRepository().delete({})
  await new EventAddressKnexDBRepository().delete({})
  await new BatchKnexDBRepository().delete({})
  await new LeasingKnexDBRepository().delete({})
  const defaultAccount = new Account(
    "default@email.com",
    "@Abc12345",
    "first",
    "last",
    false,
    false,
    true
  );
  
  const secondaryAccount = new Account(
    "secondary@email.com",
    "@Abc12345",
    "first",
    "last",
    true,
    true,
    true
  );
  await defaultAccount.isValid(true)
  await secondaryAccount.isValid(true)
  const accountRepository = new AccountKnexDBRepository();
  await accountRepository.create(defaultAccount);
  await accountRepository.create(secondaryAccount);
})
afterAll(async () => {

})

export const testServer = supertest(server);





import { AccountRepository } from ".";
import { Account } from "../models/Account";
import { DefaultKnexDBRepository } from "./defaultKnexDBRepository";

export class AccountKnexDBRepository
  extends DefaultKnexDBRepository<Account>
  implements AccountRepository
{
  constructor(accountModel = "account") {
    super(accountModel);
  }
}

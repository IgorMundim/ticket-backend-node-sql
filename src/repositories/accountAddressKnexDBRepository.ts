import { AddressAccountRepository } from ".";
import { Address } from "../models/AccountAddress";
import { DefaultKnexDBRepository } from "./defaultKnexDBRepository";

export class AccountAddressKnexDBRepository
  extends DefaultKnexDBRepository<Address>
  implements AddressAccountRepository
{
  constructor(addressModel = "address") {
    super(addressModel);
  }
}

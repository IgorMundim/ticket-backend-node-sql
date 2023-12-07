import { EventAddress } from "models/EventAddress";
import { AddressEventRepository } from ".";
import { DefaultKnexDBRepository } from "./defaultKnexDBRepository";

export class EventAddressKnexDBRepository
  extends DefaultKnexDBRepository<EventAddress>
  implements AddressEventRepository
{
  constructor(addressModel = "event_address") {
    super(addressModel);
  }
}

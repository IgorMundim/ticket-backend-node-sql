import { TicketRepository } from ".";
import { Ticket } from "../models/Ticket";
import { DefaultKnexDBRepository } from "./defaultKnexDBRepository";

export class TicketKnexDBRepository
  extends DefaultKnexDBRepository<Ticket>
  implements TicketRepository
{
  constructor(ticketModel = "ticket") {
    super(ticketModel);
  }
}

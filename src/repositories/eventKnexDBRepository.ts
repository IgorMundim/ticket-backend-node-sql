import { EventRepository } from ".";
import { DefaultKnexDBRepository } from "./defaultKnexDBRepository";
import { Event } from "../models/Event";

export class EventKnexDBRepository
  extends DefaultKnexDBRepository<Event>
  implements EventRepository
{
  constructor(eventModel = "event") {
    super(eventModel);
  }
}

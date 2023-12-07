import { CardRepository } from ".";
import { Card } from "../models/Card";
import { DefaultKnexDBRepository } from "./defaultKnexDBRepository";

export class CardKnexDBRepository
  extends DefaultKnexDBRepository<Card>
  implements CardRepository
{
  constructor(cardModel = "card") {
    super(cardModel);
  }
}

import { FilterOptions, OrderRepository, WithId } from ".";
import { Order } from "../models/Order";
import { DefaultKnexDBRepository } from "./defaultKnexDBRepository";
import { Connection } from "../provider/Connection";

export class OrderKnexDBRepository
  extends DefaultKnexDBRepository<Order>
  implements OrderRepository
{
  constructor(orderModel = "order") {
    super(orderModel);
  }
  async cancel(options: FilterOptions): Promise<WithId<Order> | undefined> {
    const result = await Connection.getDefault()
      .table("order")
      .where({ ...options })
      .update({ is_cancel: true })
      .returning("*");
    return result[0];
  }
}

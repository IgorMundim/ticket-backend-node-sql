import { Repository } from "./repository";
import { Connection } from "../provider/Connection";
import { FilterOptions } from "repositories";
import { BaseModel } from "models";

export abstract class DefaultKnexDBRepository<
  T extends BaseModel
> extends Repository<T> {
  constructor(private model: string) {
    super();
  }
  async create(data: T) {
    const result = await Connection.getDefault()
      .table(this.model)
      .insert(data.toJson())
      .returning("*");
    return result[0];
  }
  async update(data: T, options: FilterOptions) {
    const result = await Connection.getDefault()
      .table(this.model)
      .where({ ...options })
      .update(data.toJson())
      .returning("*");
    return result[0];
  }

  public async findOne(options: FilterOptions) {
    return await Connection.getDefault()
      .table(this.model)
      .select()
      .where({ ...options })
      .first();
  }
  public async find(options?: FilterOptions) {
    return await Connection.getDefault()
      .table(this.model)
      .select()
      .where({ ...options });
  }
  async delete(options: FilterOptions) {
    return await Connection.getDefault()
      .table(this.model)
      .where({ ...options })
      .del();
  }
}

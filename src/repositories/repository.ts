import { BaseRepository, FilterOptions, WithId } from "repositories";

export abstract class Repository<T> implements BaseRepository<T> {
  public abstract create(data: T): Promise<T[] | undefined>;
  public abstract update(
    data: T,
    options: FilterOptions
  ): Promise<T[] | undefined>;
  public abstract findOne(
    options: FilterOptions
  ): Promise<WithId<T> | undefined>;
  public abstract find(options: FilterOptions): Promise<WithId<T>[]>;
  public abstract delete(options: FilterOptions): Promise<number>;
}

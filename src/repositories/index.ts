import { Address } from "../models/AccountAddress";
import { Account } from "../models/Account";
import { Card } from "../models/Card";
import { Order } from "../models/Order";
import { Event } from "../models/Event";
import { EventAddress } from "../models/EventAddress";
import { Category } from "../models/Category";
import { Image } from "../models/Image";
import { Batch } from "../models/Batch";
import { Leasing } from "../models/Leasing";
import { Ticket } from "../models/Ticket";

export type WithId<T> = { id: string } & T;
export type FilterOptions = Record<string, unknown>;

export interface BaseRepository<T> {
  create(data: T): Promise<T[] | undefined>;
  update(data: T, options: FilterOptions): Promise<T[] | undefined>;
  findOne(options: FilterOptions): Promise<WithId<T> | undefined>;
  find(options: FilterOptions): Promise<WithId<T>[]>;
  delete(options: FilterOptions): Promise<number>;
}
export interface AddressAccountRepository extends BaseRepository<Address> {}
export interface AccountRepository extends BaseRepository<Account> {}
export interface CardRepository extends BaseRepository<Card> {}
export interface EventRepository extends BaseRepository<Event> {}
export interface AddressEventRepository extends BaseRepository<EventAddress> {}
export interface CategoryRepository extends BaseRepository<Category> {}
export interface ImageRepository extends BaseRepository<Image> {}
export interface TicketRepository extends BaseRepository<Ticket> {}
export interface OrderRepository extends BaseRepository<Order> {
  cancel(options: FilterOptions): Promise<WithId<Order> | undefined>;
}
export interface BatchRepository extends BaseRepository<Batch> {
  isValidChange(
    event_id: string,
    id: string,
    salesQtd: number,
    batchStopDate: Date
  ): Promise<boolean | undefined>;
  filterBySales(
    event_id: string,
    salesQtd: number,
    batchStopDate: Date
  ): Promise<WithId<Batch> | undefined>;
}

export interface LeasingRepository extends BaseRepository<Leasing> {
  getLeasing(event_id: string): Promise<WithId<Leasing>[]>;
}

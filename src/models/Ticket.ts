import { BadRequestError } from "../util/ApiError";
import { BaseModel } from ".";
import isNotValid from "../util/Validator";
export class Ticket implements BaseModel {
  constructor(
    private _price: number,
    private _salePrice: number,
    private _code: string,
    private _isStudent: boolean,
    private _isActive: boolean,
    private _units: number,
    private _eventId: string,
    private _leasingId: string,
    private _orderId: string,
    private _id?: string,
    private _createdAt?: Date,
    private _updatedAt?: Date
  ) {}
  public toJson(): {} {
    return {
      price: this._price,
      sale_price: this._salePrice,
      code: this._code,
      is_student: this._isStudent,
      is_active: this._isActive,
      units: this._units,
      event_id: this._eventId,
      leasing_id: this._leasingId,
      order_id: this._orderId,
    };
  }
  public isValid(): void {
    if (this._price === undefined)
      throw new BadRequestError("Price cannot be null!");
    if (this._salePrice === undefined)
      throw new BadRequestError("Sale price cannot be null!");
    if (this._code === undefined)
      throw new BadRequestError("Code cannot be null!");
    if (this._isStudent === undefined)
      throw new BadRequestError("Is Student cannot be null!");
    if (this._isActive === undefined)
      throw new BadRequestError("Is Active cannot be null!");
    if (this._units === undefined)
      throw new BadRequestError("Units cannot be null!");
    if (this._eventId === undefined)
      throw new BadRequestError("Event ID cannot be null!");
    if (this._leasingId === undefined)
      throw new BadRequestError("Leasing ID cannot be null!");
    if (this._orderId === undefined)
      throw new BadRequestError("Order ID cannot be null!");
    if (isNotValid.price(this._price))
      throw new BadRequestError("Price is invalid!");
    if (isNotValid.price(this._salePrice))
      throw new BadRequestError("Sale price is invalid!");
    if (isNotValid.integer(this._units))
      throw new BadRequestError("Units is invalid!");
  }
}

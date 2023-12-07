import { BadRequestError } from "util/ApiError";
import { BaseModel } from ".";

export enum Payment {
  credit,
  pix,
}
export class Order implements BaseModel {
  constructor(
    private _payTime: Date,
    private _isPaid: boolean,
    private _installment: number,
    private _typeOfPayment: Payment,
    private _accountId: string,
    private _id?: string,
    private _createdAt?: Date,
    private _updatedAt?: Date
  ) {}
  public toJson(): {} {
    return {
      pay_time: this._payTime,
      is_paid: this._isPaid,
      installment: this._installment,
      type_of_payment: this._typeOfPayment,
      account_id: this._accountId,
    };
  }
  public isValid(): void {
    if (this._payTime === undefined)
      throw new BadRequestError("payTime cannot be null!");
    if (this._isPaid === undefined)
      throw new BadRequestError("isPaid cannot be null!");
    if (this._installment === undefined)
      throw new BadRequestError("Installment cannot be null!");
    if (this._typeOfPayment === undefined)
      throw new BadRequestError("typeOfPayment cannot be null!");
    if (this._accountId === undefined)
      throw new BadRequestError("Account Id cannot be null!");
  }
}

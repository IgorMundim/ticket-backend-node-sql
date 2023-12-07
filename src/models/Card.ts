import { BaseModel } from ".";
export enum Payment {
  credit,
  pix,
}
export class Card implements BaseModel {
  constructor(
    private _accountId: string,
    private _installment: string,
    private _typeOfPayment: Payment,
    private _ticketId: string,
    private _id?: string,
    private _createdAt?: Date,
    private _updatedAt?: Date
  ) {}
  public toJson(): {} {
    return {
      account_id: this._accountId,
      id: this._id,
      installment: this._installment,
      type_of_payment: this._typeOfPayment,
      ticket_id: this._ticketId,
    };
  }
}

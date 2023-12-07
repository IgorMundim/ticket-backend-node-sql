import { BadRequestError } from "../util/ApiError";
import isNotValid from "../util/Validator";
import { BaseModel } from ".";
/**
 * @openapi
 * components:
 *  schemas:
 *    BatchInput:
 *      type: object
 *      required:
 *        - account_id
 *        - percentage
 *        - sales_qtd
 *        - batch_stop_date
 *        - description
 *        - is_active
 *        - event_id
 *      properties:
 *        account_id:
 *          type: string
 *          default: 1
 *        percentage:
 *          type: integer
 *          default: 1
 *        sales_qtd:
 *          type: integer
 *          default: 10
 *        batch_stop_date:
 *          type: string
 *          default: 2023-10-10 09:10:10
 *        description:
 *          type: string
 *          default: description
 *        is_active:
 *          type: boolean
 *          default: true
 *        event_id:
 *          type: string
 *          default: 1
 *    BatchResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        percentage:
 *          type: string
 *        sales_qtd:
 *          type: string
 *        batch_stop_date:
 *          type: string
 *        description:
 *          type: string
 *        is_active:
 *          type: string
 *        event_id:
 *          type: string
 *        created_at:
 *          type: string
 *        updated_at:
 *          type: string
 */
export class Batch implements BaseModel {
  constructor(
    private _percentage: number,
    private _salesQtd: number,
    private _batchStopDate: Date,
    private _description: string,
    private _isActive: string,
    private _eventId: string,
    private _id?: string,
    private _created_at?: Date,
    private _updated_at?: Date
  ) {}

  public toJson(): {} {
    return {
      percentage: this._percentage,
      sales_qtd: this._salesQtd,
      batch_stop_date: this._batchStopDate,
      description: this._description,
      is_active: this._isActive,
      event_id: this._eventId,
    };
  }
  public isValid(isCreate = false): void {
    if (isCreate) {
      if (this._percentage === undefined)
        throw new BadRequestError("Percentage cannot be null!");
    }
    if (this._salesQtd === undefined)
      throw new BadRequestError("sales_qtd cannot be null!");
    if (this._batchStopDate === undefined)
      throw new BadRequestError("batch_stop_date cannot be null!");
    if (this._eventId === undefined)
      throw new BadRequestError("Event id cannot be null!");
    if (isNotValid.percentage(this._percentage))
      throw new BadRequestError("Percentage is invalid!");
    if (isNotValid.date(this._batchStopDate))
      throw new BadRequestError(
        "batch_stop_date is invalid! 'aaaa-mm-dd hh:mm:ss'"
      );
  }
}

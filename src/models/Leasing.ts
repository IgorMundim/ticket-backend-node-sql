import { BadRequestError } from "../util/ApiError";
import isNotValid from "../util/Validator";
import { BaseModel } from ".";
/**
 * @openapi
 * components:
 *  schemas:
 *    LeasingInput:
 *      type: object
 *      required:
 *        - name
 *        - description
 *        - is_active
 *        - store_price
 *        - sale_price
 *        - student_price
 *        - units_solid
 *        - units
 *        - event_id
 *      properties:
 *        name:
 *          type: string
 *          default: name
 *        description:
 *          type: string
 *          default: description
 *        is_active:
 *          type: boolean
 *          default: true
 *        store_price:
 *          type: integer
 *          default: 10
 *        sale_price:
 *          type: integer
 *          default: 10
 *        student_price:
 *          type: integer
 *          default: 10
 *        units_solid:
 *          type: integer
 *          default: 10
 *        units:
 *          type: integer
 *          default: 10
 *        event_id:
 *          type: integer
 *          default: 10
 *    LeasingResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        is_active:
 *          type: boolean
 *        store_price:
 *          type: integer
 *        sale_price:
 *          type: integer
 *        student_price:
 *          type: integer
 *        units_solid:
 *          type: integer
 *        units:
 *          type: integer
 *        event_id:
 *          type: string
 *        created_at:
 *          type: string
 *        updated_at:
 *          type: string
 */
export class Leasing implements BaseModel {
  constructor(
    private _name: string,
    private _description: string,
    private _isActive: boolean,
    private _storePrice: number,
    private _salePrice: number,
    private _studentPrice: number,
    private _unitsSolid: number,
    private _units: number,
    private _eventId: string,
    private _id?: string
  ) {}
  public toJson(): {} {
    return {
      name: this._name,
      description: this._description,
      is_active: this._isActive,
      store_price: this._storePrice,
      sale_price: this._salePrice,
      student_price: this._studentPrice,
      units_solid: this._unitsSolid,
      units: this._units,
      event_id: this._eventId,
    };
  }
  public isValid(isCreate = false) {
    if (isCreate) {
      if (this._name === undefined)
        throw new BadRequestError("Name cannot be null!");
      if (this._description === undefined)
        throw new BadRequestError("Description cannot be null");
      if (this._storePrice === undefined)
        throw new BadRequestError("Store price cannot be null");
      if (this._salePrice === undefined)
        throw new BadRequestError("Sale price cannot be null");
      if (this._studentPrice === undefined)
        throw new BadRequestError("Student price cannot be null");
      if (this._unitsSolid === undefined)
        throw new BadRequestError("Units solid cannot be null");
      if (this._units === undefined)
        throw new BadRequestError("Units cannot be null");
      if (this._eventId === undefined)
        throw new BadRequestError("Event id cannot be null");
    }

    if (isNotValid.price(this._storePrice))
      throw new BadRequestError("Store price is invalid");
    if (isNotValid.price(this._salePrice))
      throw new BadRequestError("Sale price is invalid");
    if (isNotValid.price(this._studentPrice))
      throw new BadRequestError("Student price is invalid");
    if (isNotValid.price(this._unitsSolid))
      throw new BadRequestError("Units solid is invalid");
    if (isNotValid.integer(this._units))
      throw new BadRequestError("Units cannot be null");
  }
}

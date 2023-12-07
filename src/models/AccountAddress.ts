import { BadRequestError } from "../util/ApiError";
import { BaseModel } from ".";
import isNotValid from "../util/Validator";
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateAddressAccountInput:
 *      type: object
 *      required:
 *        - cpf
 *        - telephone
 *        - postal_code
 *        - complement
 *        - city
 *        - neighborhood
 *        - number
 *        - street
 *        - uf
 *        - account_id
 *      properties:
 *        cpf:
 *          type: string
 *          default: 000.000.000-01
 *        telephone:
 *          type: string
 *          default: (31) 99999-9999
 *        postal_code:
 *          type: string
 *          default: 00000-000
 *        city:
 *          type: string
 *          default: BH
 *        neighborhood:
 *          type: string
 *          default: Alameda
 *        number:
 *          type: string
 *          default: 1
 *        street:
 *          type: string
 *          default: My street
 *        uf:
 *          type: string
 *          default: MG
 *        account_id:
 *          type: string
 *          default: 1
 *    CreateAddressAccountResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        cpf:
 *          type: string
 *        telephone:
 *          type: string
 *        postal_code:
 *          type: string
 *        complement:
 *          type: string
 *        city:
 *          type: string
 *        neighborhood:
 *          type: string
 *        number:
 *          type: string
 *        street:
 *          type: string
 *        account_id:
 *          type: string
 *        created_at:
 *          type: string
 *        updated_at:
 *          type: string
 *    ArrayAddressAccountResponse:
 *      type: array
 *      items:
 *      $ref: '#/components/schemas/CreateAddressAccountResponse'
 */ 
export class Address implements BaseModel {
  constructor(
    private _cpf: string,
    private _telephone: string,
    private _postalCode: string,
    private _complement: string,
    private _city: string,
    private _neighborhood: string,
    private _number: string,
    private _street: string,
    private _uf: string,
    private _account_id?: string,
    private _id?: string,
    private _created_at?: Date,
    private _updated_at?: Date
  ) {}
  public toJson(): {} {
    return {
      cpf: this._cpf,
      telephone: this._telephone,
      postal_code: this._postalCode,
      complement: this._complement,
      city: this._city,
      neighborhood: this._neighborhood,
      number: this._number,
      street: this._street,
      uf: this._uf,
      account_id: this._account_id,
    };
  }
  public isValid(isCreate = false): void {
    if (isCreate) {
      if (this._city === undefined)
        throw new BadRequestError("City cannot be null");
      if (this._neighborhood === undefined)
        throw new BadRequestError("Neighborhood cannot be null");
      if (this._street === undefined)
        throw new BadRequestError("Street cannot be null");
      if (this._number === undefined)
        throw new BadRequestError("Number cannot be null");
      if (this._cpf === undefined)
        throw new BadRequestError("CPF  cannot be null");
      if (this._postalCode === undefined)
        throw new BadRequestError("Postal code cannot be null");
      if (this._telephone === undefined)
        throw new BadRequestError("Telephone cannot be null");
      if (this._uf === undefined)
        throw new BadRequestError("UF cannot be null");
      if (this._account_id === undefined)
        throw new BadRequestError("Account ID cannot be null");
    }
    if (isNotValid.cpf(this._cpf))
      throw new BadRequestError("CPF is not valid! ???.???.???-??");
    if (isNotValid.postalCode(this._postalCode))
      throw new BadRequestError("Postal code is not valid! ?????-???");
    if (isNotValid.telephone(this._telephone))
      throw new BadRequestError(
        "Telephone is not valid! (??)?????-???? or (??)????-????"
      );
    if (isNotValid.uf(this._uf)) {
      throw new BadRequestError("UF is not valid! ??");
    }
  }
}

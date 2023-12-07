import { hash } from "bcrypt";
import { BadRequestError } from "../util/ApiError";
import { BaseModel } from ".";
import isNotValid from "../util/Validator";
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateAccountInput:
 *      type: object
 *      required:
 *        - email
 *        - first_name
 *        - last_name
 *        - is_superuser
 *        - is_admin
 *        - is_active 
 *      properties:
 *        email:
 *          type: string
 *          default: default@default.com
 *        first_name:
 *          type: string
 *          default: firstName
 *        last_name:
 *          type: string
 *          default: lastName
 *        password:
 *          type: string
 *          default: Abc1234#
 *        is_superuser:
 *          type: boolean
 *          default: false
 *        is_admin:
 *          type: boolean
 *          default: false
 *        is_active:
 *          type: boolean
 *          default: true
 *    CreateAccountResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        last_login:
 *          type: string
 *        first_name:
 *          type: string
 *        last_name:
 *          type: string
 *        is_superuser:
 *          type: boolean
 *        is_admin:
 *          type: boolean
 *        is_active:
 *          type: boolean
 *        created_at:
 *          type: string
 *        updated_at:
 *          type: string
 */  
export class Account implements BaseModel {
  constructor(
    private _email: string,
    private _password: string,
    private _firstName: string,
    private _lastName: string,
    private _isSuperuser: boolean,
    private _isAdmin: boolean,
    private _isActive: boolean,
    private _lastLogin?: Date,
    private _id?: string,
    private _created_at?: Date,
    private _updated_at?: Date
  ) {}

  public toJson(): {} {
    return {
      email: this._email,
      password: this._password,
      first_name: this._firstName,
      last_name: this._lastName,
      is_superuser: this._isSuperuser,
      is_admin: this._isAdmin,
      is_active: this._isActive,
      last_login: this._lastLogin,
    };
  }

  public async isValid(isCreate = false): Promise<void> {
    if (isCreate) {
      if (this._email === undefined)
        throw new BadRequestError("Email cannot be null!");
      if (this._password === undefined)
        throw new BadRequestError("Password cannot be null!");
      if (this._firstName === undefined)
        throw new BadRequestError("First name cannot be null!");
      if (this._lastName === undefined)
        throw new BadRequestError("Last name cannot be null!");
    }
    if (isNotValid.email(this._email))
      throw new BadRequestError("Email is not valid!");
    if (isNotValid.char(this._firstName))
      throw new BadRequestError("First name is not valid!");
    if (isNotValid.char(this._lastName))
      throw new BadRequestError("Last name is not valid");
    if (isNotValid.password(this._password))
      throw new BadRequestError("Password is not valid");
    if (this._password) this._password = await hash(this._password, 8);
  }

  public get isAdmin(): boolean {
    return this._isAdmin;
  }
  public set isAdmin(value: boolean) {
    this._isAdmin = value;
  }
  // public get id(): string {
  //   return this._id;
  // }
  // public set id(value: string) {
  //   this._id = value;
  // }
}

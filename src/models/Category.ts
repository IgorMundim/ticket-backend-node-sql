import { BadRequestError } from "../util/ApiError";
import { BaseModel } from ".";
import isNotValid from "../util/Validator";

/**
 * @openapi
 * components:
 *  schemas:
 *    CategoryInput:
 *      type: object
 *      required:
 *        - name
 *        - is_active
 *        - url
 *        - alt_text
 *      properties:
 *        name:
 *          type: string
 *          default: name
 *        is_active:
 *          type: boolean
 *          default: true
 *        url:
 *          type: string
 *          format: binary
 *        alt_text:
 *          type: string
 *          default: text
 *    CategoryResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        is_active:
 *          type: string
 *        url:
 *          type: string
 *        alt_text:
 *          type: string
 *        created_at:
 *          type: string
 *        updated_at:
 *          type: string
 */ 
export class Category implements BaseModel {
  constructor(
    private _name: string,
    private _isActive: boolean,
    private _url: string,
    private _altText: string,
    private _id?: string
  ) {}
  public toJson(): {} {
    return {
      name: this._name,
      is_active: this._isActive,
      url: this._url,
      alt_text: this._altText,
    };
  }
  public isValid(): void {
    if (this._name === undefined)
      throw new BadRequestError("Name cannot be null");
    if (this._url === undefined)
      throw new BadRequestError("Url cannot be null");
    if (this._altText === undefined)
      throw new BadRequestError("alt_text cannot be null");
  }
}

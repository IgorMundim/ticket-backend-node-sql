import { BadRequestError } from "../util/ApiError";
import { BaseModel } from ".";

/**
 * @openapi
 * components:
 *  schemas:
 *    ImageInput:
 *      type: object
 *      required:
 *        - url
 *        - alt_text
 *        - event_id
 *      properties:
 *        url:
 *          type: string
 *          format: binary
 *        alt_text:
 *          type: string
 *          default: description
 *        event_id:
 *          type: integer
 *          default: 10
 *    ImageResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        url:
 *          type: string
 *        alt_text:
 *          type: string
 *        event_id:
 *          type: string
 *        created_at:
 *          type: string
 *        updated_at:
 *          type: string
 */
export class Image implements BaseModel {
  constructor(
    private _url: string,
    private _altText: string,
    private _eventId: string,
    private _id?: string
  ) {}
  public toJson(): {} {
    return {
      url: this._url,
      alt_text: this._altText,
      event_id: this._eventId,
    };
  }
  public isValid(): void {
    if (this._url === undefined)
      throw new BadRequestError("Url cannot be null");
    if (this._altText === undefined)
      throw new BadRequestError("alt_text cannot be null");
    if (this._eventId === undefined)
      throw new BadRequestError("Event id cannot be null");
  }
}

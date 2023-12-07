import { BadRequestError } from "../util/ApiError";
import { BaseModel } from ".";
import isNotValid from "../util/Validator";
/**
 * @openapi
 * components:
 *  schemas:
 *    EventInput:
 *      type: object
 *      required:
 *        - account_id
 *        - name
 *        - in_room
 *        - date_end
 *        - date_start
 *        - description
 *        - is_virtual
 *        - video_url
 *        - is_published
 *      properties:
 *        account_id:
 *          type: string
 *        name:
 *          type: string
 *          default: Event Name
 *        in_room:
 *          type: boolean
 *          default: false
 *        date_end:
 *          type: string
 *          default: 2023-10-10 10:10:10
 *        date_start:
 *          type: string
 *          default: 2023-10-10 09:10:10
 *        description:
 *          type: string
 *          default: description
 *        is_virtual:
 *          type: boolean
 *          default: false
 *        video_url:
 *          type: string
 *          default: www.default.com
 *        is_published:
 *          type: boolean
 *          default: true
 *    EventResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        in_room:
 *          type: string
 *        date_end:
 *          type: string
 *        date_start:
 *          type: string
 *        description:
 *          type: string
 *        is_virtual:
 *          type: string
 *        video_url:
 *          type: string
 *        is_published:
 *          type: string
 *        account_id:
 *          type: string
 *        created_at:
 *          type: string
 *        updated_at:
 *          type: string
 */ 
export class Event implements BaseModel {
  constructor(
    private _accountId: string,
    private _name: string,
    private _inRoom: boolean,
    private _dateEnd: Date,
    private _dateStart: Date,
    private _description: string,
    private _isVirtual: boolean,
    private _videoUrl: string,
    private _isPublished: boolean,
    private _id?: string
  ) {}
  public toJson(): {} {
    return {
      account_id: this._accountId,
      name: this._name,
      in_room: this._inRoom,
      date_end: this._dateEnd,
      date_start: this._dateStart,
      description: this._description,
      is_virtual: this._isVirtual,
      video_url: this._videoUrl,
      is_published: this._isPublished,
      id: this._id,
    };
  }
  public isValid(isCreate = false) {
    if (isCreate) {
      if (this._name === undefined)
        throw new BadRequestError("Name cannot be null");
      if (this._dateStart === undefined)
        throw new BadRequestError("Date start cannot be null");
      if (this._dateEnd === undefined)
        throw new BadRequestError("Date end cannot be null");
    }
    // if (isNotValid.char(this._name))
    //   throw new BadRequestError("Name is not valid");
    if (isNotValid.date(this._dateStart))
      throw new BadRequestError("Date start is not valid");
    if (isNotValid.date(this._dateEnd))
      throw new BadRequestError("Date start is not valid");
    if (isNotValid.isBoolean(this._inRoom))
      throw new BadRequestError("in_room is not valid");
    if (isNotValid.isBoolean(this._isVirtual))
      throw new BadRequestError("is_virtual is not valid");
    if (isNotValid.isBoolean(this._isPublished))
      throw new BadRequestError("is_published is not valid");
  }
}

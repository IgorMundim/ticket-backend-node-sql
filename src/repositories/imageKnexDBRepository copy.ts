import { ImageRepository } from ".";
import { Image } from "../models/Image";
import { DefaultKnexDBRepository } from "./defaultKnexDBRepository";

export class ImageKnexDBRepository
  extends DefaultKnexDBRepository<Image>
  implements ImageRepository
{
  constructor(imageModel = "image") {
    super(imageModel);
  }
}

import { CategoryRepository } from ".";
import { DefaultKnexDBRepository } from "./defaultKnexDBRepository";
import { Category } from "../models/Category";

export class CategoryKnexDBRepository
  extends DefaultKnexDBRepository<Category>
  implements CategoryRepository
{
  constructor(categoryModel = "category") {
    super(categoryModel);
  }
}

import { Connection } from "../provider/Connection";

export interface Category {
  id: string;
  name: string;
  is_active: boolean;
  url: string;
  alt_text: string;
}

export const getCategory = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("category")
      .select()
      .where({ id: pk });
  } catch (e) {
    return null;
  }
};

export const createCategory = async (category: Category) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("category")
      .insert(category);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const updateCategory = async (category: Category, pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("category")
      .where({ id: pk })
      .update(category);
  } catch (e) {
    return null;
  }
};

export const deleteCategory = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("category")
      .where({ id: pk })
      .del();
  } catch (e) {
    return null;
  }
};

export const query = {
  getCategory,
  updateCategory,
  createCategory,
  deleteCategory,
};

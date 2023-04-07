import { Connection } from "../provider/Connection";

export interface Category {
  id: string;
  name: string;
  is_active: boolean;
  url: string;
  alt_text: string;
}

export const getCategory = async (pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("category")
    .select()
    .where({ id: pk });
};

export const createCategory = async (category: Category) => {
  return await Connection.getProductionEnvironment()
    .table("category")
    .insert(category);
};

export const updateCategory = async (category: Category, pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("category")
    .where({ id: pk })
    .update(category);
};

export const deleteCategory = async (pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("category")
    .where({ id: pk })
    .del();
};

export const query = {
  getCategory,
  updateCategory,
  createCategory,
  deleteCategory,
};

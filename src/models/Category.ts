import { Connection } from "../provider/Connection";

export interface Category {
  id: string;
  name: string;
  in_room: boolean;
  date_end: Date;
  date_start: Date;
  description: string;
  is_virtual: boolean;
  video_url: string;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
}

export const getCategory = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("category")
      .select()
      .where({ id: pk });
  } catch (e) {
    Error;
  }
};

export const createCategory = async (category: Category) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("category")
      .insert(category);
  } catch (e) {
    Error;
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
    Error;
  }
};

export const query = {
  getCategory,
  updateCategory,
  createCategory,
  deleteCategory,
};

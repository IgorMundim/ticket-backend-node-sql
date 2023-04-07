import { Connection } from "../provider/Connection";
export interface Image {
  id: number;
  url: string;
  alt_text: string;
  event_id: number;
}

export const getImage = async (pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("image")
    .select()
    .where({ event_id: pk });
};

export const createImage = async (image: Image) => {
  return await Connection.getProductionEnvironment()
    .table("image")
    .insert(image);
};

export const updateImage = async (image: Image, pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("image")
    .where({ id: pk })
    .update(image);
};

export const deleteImage = async (pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("image")
    .where({ id: pk })
    .del();
};

export const query = {
  getImage,
  updateImage,
  createImage,
  deleteImage,
};

import { Connection } from "../provider/Connection";
export interface Image {
  id: number;
  url: string;
  alt_text: string;
  event_id: number;
}

export const getImage = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("image")
      .select()
      .where({ event_id: pk });
  } catch (e) {
    Error;
  }
};

export const createImage = async (image: Image) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("image")
      .insert(image);
  } catch (e) {
    console.log(e);
    Error;
  }
};

export const updateImage = async (image: Image, pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("image")
      .where({ id: pk })
      .update(image);
  } catch (e) {
    return null;
  }
};

export const deleteImage = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("image")
      .where({ id: pk })
      .del();
  } catch (e) {
    Error;
  }
};

export const query = {
  getImage,
  updateImage,
  createImage,
  deleteImage,
};

import { Connection } from "../provider/Connection";
export enum Payment {
  credit,
  pix,
}
export interface Card {
  id: string;
  installment: string;
  type_of_payment: Payment;
  ticket_id: number;
  created_at: Date;
  updated_at: Date;
}

export const getCard = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("card")
      .select()
      .where({ account_id: pk });
  } catch (e) {
    Error;
  }
};

export const createCard = async (card: Card) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("card")
      .insert(card);
  } catch (e) {
    Error;
  }
};

export const updateCard = async (card: Card, pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("card")
      .where({ id: pk })
      .update(card);
  } catch (e) {
    return null;
  }
};

export const deleteCard = async (pk: number) => {
  try {
    return await Connection.getProductionEnvironment()
      .table("card")
      .where({ id: pk })
      .del();
  } catch (e) {
    Error;
  }
};

export const query = {
  getCard,
  updateCard,
  createCard,
  deleteCard,
};

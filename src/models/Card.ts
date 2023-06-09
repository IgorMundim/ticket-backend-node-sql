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
  return await Connection.getProductionEnvironment()
    .table("card")
    .select()
    .where({ account_id: pk });
};

export const createCard = async (card: Card) => {
  return await Connection.getProductionEnvironment().table("card").insert(card);
};

export const updateCard = async (card: Card, pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("card")
    .where({ id: pk })
    .update(card);
};

export const deleteCard = async (pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("card")
    .where({ id: pk })
    .del();
};

export const query = {
  getCard,
  updateCard,
  createCard,
  deleteCard,
};

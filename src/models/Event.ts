import { Connection } from "../provider/Connection";

export interface Event {
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

export const getEvent = async (pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("event")
    .select()
    .where({ id: pk });
};

export const createEvent = async (event: Event) => {
  return await Connection.getProductionEnvironment()
    .table("event")
    .insert(event);
};

export const updateEvent = async (event: Event, pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("event")
    .where({ id: pk })
    .update(event);
};

export const deleteEvent = async (pk: number) => {
  return await Connection.getProductionEnvironment()
    .table("event")
    .where({ id: pk })
    .del();
};

export const query = {
  getEvent,
  updateEvent,
  createEvent,
  deleteEvent,
};

import * as express from "express";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { Connection } from "../provider/connection";
dotenv.config();

const app = express();

export interface Category {
  id: number;
  name?: string;
  is_active?: boolean;
  url?: string;
  alt_text?: string;
  created_at?: Date;
  updated_at?: Date;
}
const a = async () => {
  const resp = (await Connection.getProductionEnvironment()
    .table("category")
    .select("*")) as Category[];
  console.log(resp);
  // await create(false).destroy();
};
a();

app.get("/", (req: Request, res: Response) => {
  res.send("New server!");
});

app.listen(3000, () => console.log("App listening"));

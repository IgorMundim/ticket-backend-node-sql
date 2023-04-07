import accountRoutes from "./routes/accountRoutes";
import orderRoutes from "./routes/orderRoutes";
import eventRoutes from "./routes/eventRoutes";
import { Request, Response, NextFunction } from "express";
import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1/account", accountRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/order", orderRoutes);
app.use(
  (error: Error, req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: error.message,
    });
  }
);


app.listen(3000, () => console.log("App listening"));

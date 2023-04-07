import "express-async-errors";
import accountRoutes from "./routes/accountRoutes";
import orderRoutes from "./routes/orderRoutes";
import eventRoutes from "./routes/eventRoutes";
import * as express from "express";
import * as dotenv from "dotenv";
import errorMiddleware from "./middlewares/Error";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1/account", accountRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/order", orderRoutes);

app.use(errorMiddleware.error);

app.listen(3000, () => console.log("App listening"));

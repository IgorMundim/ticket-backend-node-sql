import "express-async-errors";
import accountRoutes from "./routes/accountRoutes";
import orderRoutes from "./routes/orderRoutes";
import eventRoutes from "./routes/eventRoutes";
import * as express from "express";
import * as dotenv from "dotenv";
import errorMiddleware from "./middlewares/Error";

dotenv.config();

const server = express();
server.use(express.json());

server.use("/api/v1/account", accountRoutes);
server.use("/api/v1/event", eventRoutes);
server.use("/api/v1/order", orderRoutes);

server.use(errorMiddleware.error);

export default server;

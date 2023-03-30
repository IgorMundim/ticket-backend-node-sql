import account from "./routes/accountRoute";
import order from "./routes/orderRoute"
import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/v1/account", account);
app.use("/api/v1/order", order);

app.listen(3000, () => console.log("App listening"));

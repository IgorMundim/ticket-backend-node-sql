import { Router } from "express";
import orderController from "../controllers/OrderController";
import ticketController from "../controllers/TicketController";
import ticketValidator from "../middlewares/TicketValidator";

const router = Router();

router.get("/:pk/ticket", ticketController.index);
router.patch("/ticket/:pk", ticketValidator.isValid, ticketController.update);
router.post("/:pk/ticket", ticketValidator.isValid, ticketController.create);
router.delete("/ticket/:pk", ticketController.delete);

router.get("/:pk", orderController.index);
router.patch("/:pk", orderController.update);
router.post("/", orderController.create);
router.delete("/:pk", orderController.delete);

export default router;

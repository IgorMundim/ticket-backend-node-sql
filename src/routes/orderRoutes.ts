import { Router } from "express";
import orderController from "../controllers/OrderController";
import ticketController from "../controllers/TicketController";
const router = Router();

router.get("/:pk/ticket", ticketController.index);
router.patch("/ticket/:pk", ticketController.update)
router.post("/:pk/ticket", ticketController.create)
router.delete("/ticket/:pk", ticketController.delete)

router.get("/:pk", orderController.index);
router.patch("/:pk", orderController.update);
router.post("/", orderController.create);
router.delete("/:pk", orderController.delete);

export default router;
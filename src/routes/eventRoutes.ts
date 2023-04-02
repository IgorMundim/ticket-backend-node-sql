import { Router } from "express";
import eventController from "../controllers/EventController";
import batchController from "../controllers/BatchController";
import addressController from "../controllers/EventAddressController";
const router = Router();

router.get("/:pk", eventController.index);
router.patch("/:pk", eventController.update);
router.post("/", eventController.create);
router.delete("/:pk", eventController.delete);

router.get("/:pk/batch", batchController.index);
router.patch("/batch/:pk", batchController.update);
router.post("/batch", batchController.create);
router.delete("/batch/:pk", batchController.delete);

router.get("/:pk/address", addressController.index);
router.patch("/address/:pk", addressController.update);
router.post("/address", addressController.create);
router.delete("/address/:pk", addressController.delete);

export default router;

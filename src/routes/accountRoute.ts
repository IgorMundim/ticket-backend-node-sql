import { Router } from "express";
import addressController from "../controllers/AccountAddressController";
import accountController from "../controllers/AccountController"; 
import cardController from "../controllers/CardController"; 
const router = Router();

router.get("/:pk/address", addressController.index);
router.patch("/address/:pk", addressController.update)
router.post("/:pk/address", addressController.create)
router.delete("/address/:pk", addressController.delete)

router.get("/:pk/card", cardController.index);
router.patch("/card/:pk", cardController.update)
router.post("/:pk/card", cardController.create)
router.delete("/card/:pk", cardController.delete)

router.get("/:pk", accountController.index);
router.patch("/:pk", accountController.update)
router.post("/", accountController.create)
router.delete("/:pk", accountController.delete)

export default router;

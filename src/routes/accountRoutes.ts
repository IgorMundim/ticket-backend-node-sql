import { Router } from "express";
import addressController from "../controllers/AccountAddressController";
import accountController from "../controllers/AccountController";
import cardController from "../controllers/CardController";
import validator from "../middlewares/AccountValidator";
import validatorAddress from "../middlewares/AddressValidator";

const router = Router();

router.get("/:pk", accountController.index);
router.patch("/:pk", validator.update, accountController.update);
router.post("/", validator.create, accountController.create);
router.delete("/:pk", accountController.delete);

router.get("/:pk/address", addressController.index);
router.patch(
  "/address/:pk",
  validatorAddress.isValid,
  addressController.update
);
router.post("/:pk/address", validatorAddress.isValid, addressController.create);
router.delete("/address/:pk", addressController.delete);

router.get("/:pk/card", cardController.index);
router.patch("/card/:pk", cardController.update);
router.post("/:pk/card", cardController.create);
router.delete("/card/:pk", cardController.delete);

export default router;

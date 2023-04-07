import { Router } from "express";
import addressController from "../controllers/AccountAddressController";
import accountController from "../controllers/AccountController";
import cardController from "../controllers/CardController";
import authenticationController from "../controllers/AuthenticateContoller";

import validator from "../middlewares/AccountValidator";
import validatorAddress from "../middlewares/AddressValidator";
import ensure from "../middlewares/EnsureAuthenticated";

const router = Router();

router.post("/login", authenticationController.login);
router.post("/refresh-token", authenticationController.refreshToken);

router.get("/:pk", ensure.isAuth, accountController.index);
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

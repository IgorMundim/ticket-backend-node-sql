import { Router } from "express";
import eventController from "../controllers/EventController";
import batchController from "../controllers/BatchController";
import addressController from "../controllers/EventAddressController";
import leasingController from "../controllers/LeasingController";
import categoryController from "../controllers/CategoryController";
import imageController from "../controllers/ImageController";
import multerUpload from "../util/multerUpload";
import leasingValidator from "../middlewares/LeasingValidator";
import categotyValidator from "../middlewares/CategoryValidator";
import batchValidator from "../middlewares/BatchValidator";
import imageValidator from "../middlewares/ImageValidator";
import eventAddressValidator from "../middlewares/EventAddressValidator";
import eventValidator from "../middlewares/EventValidator";

const router = Router();

router.get("/:pk", eventController.index);
router.patch("/:pk", eventValidator.update, eventController.update);
router.post("/", eventValidator.create, eventController.create);
router.delete("/:pk", eventController.delete);

router.get("/:pk/batch", batchController.index);
router.patch("/batch/:pk", batchValidator.update, batchController.update);
router.post("/batch", batchValidator.create, batchController.create);
router.delete("/batch/:pk", batchController.delete);

router.get("/:pk/address", addressController.index);
router.patch(
  "/address/:pk",
  eventAddressValidator.isValid,
  addressController.update
);
router.post(
  "/address",
  eventAddressValidator.isValid,
  addressController.create
);
router.delete("/address/:pk", addressController.delete);

router.get("/:pk/leasing", leasingController.index);
router.patch(
  "/leasing/:pk",
  leasingValidator.isValid,
  leasingController.update
);
router.post("/leasing", leasingValidator.isValid, leasingController.create);
router.delete("/leasing/:pk", leasingController.delete);

router.get("/:pk/image", imageController.index);
router.patch(
  "/image/:pk",

  multerUpload.single("url"),
  imageValidator.isValid,
  imageController.update
);
router.post(
  "/image",
  multerUpload.single("url"),
  imageValidator.isValid,
  imageController.create
);
router.delete("/image/:pk", imageController.delete);

router.get("/category/:pk", categoryController.index);
router.patch(
  "/category/:pk",
  categotyValidator.isValid,
  multerUpload.single("url"),
  categoryController.update
);
router.post(
  "/category",
  categotyValidator.isValid,
  multerUpload.single("url"),
  categoryController.create
);
router.delete("/category/:pk", categoryController.delete);

export default router;

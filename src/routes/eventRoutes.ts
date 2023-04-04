import { Router } from "express";
import eventController from "../controllers/EventController";
import batchController from "../controllers/BatchController";
import addressController from "../controllers/EventAddressController";
import leasingController from "../controllers/LeasingController";
import categoryController from "../controllers/ImageController";
import imageController from "../controllers/ImageController";
import multerUpload from "../util/multerUpload";
import leasingValidator from "../middlewares/LeasingValidator";

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

router.get("/:pk/leasing", leasingController.index);
router.patch(
  "/leasing/:pk",
  leasingValidator.isValid,
  leasingController.update
);
router.post("/leasing", leasingValidator.isValid, leasingController.create);
router.delete("/leasing/:pk", leasingController.delete);

router.get("/:pk/image", imageController.index);
router.patch("/image/:pk", multerUpload.single("url"), imageController.update);
router.post("/image", multerUpload.single("url"), imageController.create);
router.delete("/image/:pk", imageController.delete);

router.get("/category/:pk", categoryController.index);
router.patch("/category/:pk", categoryController.update);
router.post("/category", categoryController.create);
router.delete("/category/:pk", categoryController.delete);

export default router;

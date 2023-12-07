import { Router } from "express";
import eventController from "../controllers/EventController";
import batchController from "../controllers/BatchController";
import addressController from "../controllers/EventAddressController";
import leasingController from "../controllers/LeasingController";
import categoryController from "../controllers/CategoryController";
import imageController from "../controllers/ImageController";
import multerUpload from "../util/multerUpload";
import authentication from "../middleware/Authentication";
import authorization from "../middleware/Authorization";

const router = Router();

/**
 * @openapi
 * '/api/v1/event/batch/{id}':
 *  get:
 *    tags:
 *    - Batch
 *    summary: Get a single batch by the id
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the batch
 *       required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BatchResponse'
 *      400:
 *        description: Bad Request
 *  
 */
router.get("/batch/:id", batchController.findOne);
/**
 * @openapi
 * '/api/v1/event/{event_id}/batch':
 *  get:
 *    tags:
 *    - Batch
 *    parameters:
 *     - name: event_id
 *       in: path
 *       description: The id of the event
 *       required: true
 *    summary: Get all batch by the event id
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *                items:
 *                  $ref: '#/components/schemas/BatchResponse'
 *      400:
 *        description: Bad request
 */
router.get("/:event_id/batch", batchController.find);
/**
 * @openapi
 * '/api/v1/event/batch/{id}':
 *  patch:
 *    tags:
 *    - Batch
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the batch
 *       required: true
 *    summary: Patch a new batch by the id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BatchInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BatchResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.patch(
  "/batch/:id",
  authentication.execute,
  authorization.isAdmin,
  authorization.isOwnerBatch,
  batchController.update
);
/**
 * @openapi
 * '/api/v1/event/{event_id}/batch':
 *  post:
 *    tags:
 *    - Batch
 *    parameters:
 *     - name: event_id
 *       in: path
 *       description: The id of the batch
 *       required: true
 *    summary: Create a new batch by the batch id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BatchInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BatchResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.post(
  "/:event_id/batch",
  authentication.execute,
  authorization.isAdmin,
  authorization.isOwnerByEventParam,
  batchController.create
);
/**
 * @openapi
 * '/api/v1/event/batch/{id}':
 *  delete:
 *    tags:
 *    - Batch
 *    summary: Delete batch by  the account id
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the batch
 *       required: true
 *    responses:
 *      200:
 *        description: Success
 *              
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized 
 */
router.delete(
  "/batch/:id",
  authentication.execute,
  authorization.isAdmin,
  authorization.isOwnerBatch,
  batchController.delete
);
/**
 * @openapi
 * '/api/v1/event/{event_id}/address/':
 *  get:
 *    tags:
 *    - Event Address
 *    parameters:
 *     - name: event_id
 *       in: path
 *       description: The id of the event address
 *       required: true
 *    summary: Get all event address  by the id
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EventAddressAccountResponse'
 *      400:
 *        description: Bad request
 */
router.get("/:event_id/address", addressController.findOne);
/**
 * @openapi
 * '/api/v1/event/address/{id}':
 *  patch:
 *    tags:
 *    - Event Address
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the event address
 *       required: true
 *    summary: Patch a new event address by the id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/EventAddressAccountInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EventAddressAccountResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.patch(
  "/address/:id",
  authentication.execute,
  authorization.isAdmin,
  authorization.isOwnerEventAddress,
  addressController.update
);
/**
 * @openapi
 * '/api/v1/event/{event_id}/address':
 *  post:
 *    tags:
 *    - Event Address
 *    parameters:
 *     - name: event_id
 *       in: path
 *       description: The id of the event
 *       required: true
 *    summary: Create a new address  by the event id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/EventAddressAccountInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EventAddressAccountResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.post(
  "/:event_id/address",
  authentication.execute,
  authorization.isAdmin,
  authorization.isOwnerByEventParam,
  addressController.create
);
/**
 * @openapi
 * '/api/v1/event/address/{id}':
 *  delete:
 *    tags:
 *    - Event Address
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the event address
 *       required: true
 *    summary: Delete a event address  by the id
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EventAddressAccountResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.delete(
  "/address/:id",
  authentication.execute,
  authorization.isAdmin,
  authorization.isOwnerEventAddress,
  addressController.delete
);
/**
 * @openapi
 * '/api/v1/event/{event_id}/leasing':
 *  get:
 *    tags:
 *    - Leasing
 *    parameters:
 *     - name: event_id
 *       in: path
 *       description: The id of the event
 *       required: true
 *    summary: Get all leasing by the event id
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *                items:
 *                  $ref: '#/components/schemas/LeasingResponse'
 *      400:
 *        description: Bad request
 */
router.get("/:event_id/leasing", leasingController.find);
// /**
//  * @openapi
//  * '/api/v1/event/leasing/{id}':
//  *  get:
//  *    tags:
//  *    - Leasing
//  *    parameters:
//  *     - name: id
//  *       in: path
//  *       description: The id of the leasing
//  *       required: true
//  *    summary: Get a leasing by the id
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content:
//  *          application/json:
//  *            schema:
//  *              $ref: '#/components/schemas/LeasingResponse'
//  *      400:
//  *        description: Bad request
//  */
// router.get("/leasing/:id", leasingController.findOne);
/**
 * @openapi
 * '/api/v1/event/leasing/{id}':
 *  patch:
 *    tags:
 *    - Leasing
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the leasing
 *       required: true
 *    summary: Patch a leasing by the id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LeasingInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LeasingResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.patch(
  "/leasing/:id",
  authentication.execute,
  authorization.isAdmin,
  authorization.isOwnerLeasing,
  leasingController.update
);
/**
 * @openapi
 * '/api/v1/event/{event_id}/leasing':
 *  post:
 *    tags:
 *    - Leasing
 *    parameters:
 *     - name: event_id
 *       in: path
 *       description: The id of the leasing
 *       required: true
 *    summary: Create a new leasing by the event id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LeasingInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LeasingResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.post(
  "/:event_id/leasing",
  authentication.execute,
  authorization.isAdmin,
  authorization.isOwnerByEventParam,
  leasingController.create
);
/**
 * @openapi
 * '/api/v1/event/leasing/{id}':
 *  delete:
 *    tags:
 *    - Leasing
 *    summary: Delete leasing by the id
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the leasing
 *       required: true
 *    responses:
 *      200:
 *        description: Success           
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized 
 */
router.delete(
  "/leasing/:id",
  authentication.execute,
  authorization.isAdmin,
  authorization.isOwnerLeasing,
  leasingController.delete
);
/**
 * @openapi
 * '/api/v1/event/{event_id}/image':
 *  get:
 *    tags:
 *    - Image
 *    parameters:
 *     - name: event_id
 *       in: path
 *       description: The id of the event
 *       required: true
 *    summary: Get all images by the event id
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              items:
 *                $ref: '#/components/schemas/ImageResponse'
 *      400:
 *        description: Bad request
 */
router.get("/:event_id/image", imageController.find);
/**
 * @openapi
 * '/api/v1/event/image/{id}':
 *  patch:
 *    tags:
 *    - Image
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the image
 *       required: true
 *    summary: Patch a image by the id
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/ImageInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ImageResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.patch(
  "/image/:id",
  authentication.execute,
  authorization.isAdmin,
  authorization.isOwnerImage,
  multerUpload.single("url"),
  imageController.update
);
/**
 * @openapi
 * '/api/v1/event/{event_id}/image':
 *  post:
 *    tags:
 *    - Image
 *    parameters:
 *     - name: event_id
 *       in: path
 *       description: The id of the event
 *       required: true
 *    summary: Create a new image by the event id
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/ImageInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ImageResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.post(
  "/:event_id/image",
  authentication.execute,
  authorization.isAdmin,
  authorization.isOwnerByEventParam,
  multerUpload.single("url"),
  imageController.create
);

/**
 * @openapi
 * '/api/v1/event/image/{id}':
 *  delete:
 *    tags:
 *    - Image
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the image
 *       required: true
 *    summary: Delete a image by the id
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ImageResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.delete(
  "/image/:id",
  authentication.execute,
  authorization.isAdmin,
  authorization.isOwnerImage,
  imageController.delete
);
/**
 * @openapi
 * '/api/v1/event/category':
 *  get:
 *    tags:
 *    - Category
 *    summary: Get all categories
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              items:
 *                $ref: '#/components/schemas/CategoryResponse'
 *      400:
 *        description: Bad request
 */
router.get("/category", categoryController.find);
/**
 * @openapi
 * '/api/v1/event/category/{id}':
 *  get:
 *    tags:
 *    - Category
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the category
 *       required: true
 *    summary: Get a category by the id
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryResponse'
 *      400:
 *        description: Bad request
 */
router.get("/category/:id", categoryController.findOne);
/**
 * @openapi
 * '/api/v1/event/category/{id}':
 *  patch:
 *    tags:
 *    - Category
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the category
 *       required: true
 *    summary: Patch a category by the id
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/CategoryInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.patch(
  "/category/:id",
  authentication.execute,
  authorization.isAdmin,
  multerUpload.single("url"),
  categoryController.update
);

/**
 * @openapi
 * '/api/v1/event/category':
 *  post:
 *    tags:
 *    - Category
 *    summary: Create a new category by the id
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/CategoryInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.post(
  "/category",
  authentication.execute,
  authorization.isAdmin,
  multerUpload.single("url"),
  categoryController.create
);
/**
 * @openapi
 * '/api/v1/event/category/{id}':
 *  delete:
 *    tags:
 *    - Category
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the category
 *       required: true
 *    summary: Delete a category by the id
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.delete(
  "/category/:id",
  authentication.execute,
  authorization.isAdmin,
  categoryController.delete
);
/**
 * @openapi
 * '/api/v1/event/{id}':
 *  get:
 *    tags:
 *    - Event
 *    summary: Get a single event by the id
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the event
 *       required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EventResponse'
 *      400:
 *        description: Bad Request
 *  
 */
router.get("/:id", eventController.findOne);
/**
 * @openapi
 * '/api/v1/event':
 *  get:
 *    tags:
 *    - Event
 *    summary: Get all events
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              items:
 *                $ref: '#/components/schemas/EventResponse'
 *      400:
 *        description: Bad Request
 *  
 */
router.get("/", eventController.find);
/**
 * @openapi
 * '/api/v1/event/{id}':
 *  patch:
 *    tags:
 *    - Event
 *    summary: Patch event by the id
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the event
 *       required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/EventInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EventResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized 
 */
router.patch(
  "/:id",
  authentication.execute,
  authorization.isAdmin,
  authorization.isOwnerByIdEventParam,
  eventController.update
);
/**
 * @openapi
 * '/api/v1/event':
 *  post:
 *    tags:
 *    - Event
 *    summary: Create a new event
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/EventInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EventResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized 
 */
router.post(
  "/",
  authentication.execute,
  authorization.isAdmin,
  eventController.create
);
/**
 * @openapi
 * '/api/v1/event/{id}':
 *  delete:
 *    tags:
 *    - Event
 *    summary: Delete event by the id
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the event
 *       required: true
 *    responses:
 *      200:
 *        description: Success
 *              
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized 
 */
router.delete(
  "/:id",
  authentication.execute,
  authorization.isAdmin,
  authorization.isOwnerByIdEventParam,
  eventController.delete
);

export default router;

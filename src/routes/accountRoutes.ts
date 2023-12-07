import { Router } from "express";
import addressController from "../controllers/AccountAddressController";
import accountController from "../controllers/AccountController";
import cardController from "../controllers/CardController";
import authenticationController from "../controllers/AuthenticateContoller";
import orderController from "../controllers/OrderController";
import ticketController from "../controllers/TicketController";

import authentication from "../middleware/Authentication";
import authorization from "../middleware/Authorization";

const router = Router();
/**
* @openapi
* '/api/v1/account/login':
*  post:
*    tags:
*    - Session
*    summary: Create connection 
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/CreateSessionInput'
*    responses:
*      200:
*        description: Success
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/CreateSessionResponse'
*      400:
*        description: Bad Request
*
*/
router.post("/login", authenticationController.login);
/**
* @openapi
* '/api/v1/account/refresh-token':
*  post:
*    tags:
*    - Session
*    summary: Refresh token
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            type: object
*            properties:
*              token:
*                type: string
*    responses:
*      200:
*        description: Success
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/CreateSessionResponse'
*      400:
*        description: Bad Request
*      401:
*        description: Unauthorized
*
*/
router.post("/refresh-token", authenticationController.refreshToken);
/**
 * @openapi
 * '/api/v1/account/{account_id}/address':
 *  get:
 *    tags:
 *    - Address
 *    parameters:
 *     - name: account_id
 *       in: path
 *       description: The id of the account
 *       required: true
 *    summary: Get all address by the account id
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *                items:
 *                  $ref: '#/components/schemas/ArrayAddressAccountResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.get(
  "/:account_id/address",
  authentication.execute,
  authorization.explicitOwner,
  addressController.find
);
/**
 * @openapi
 * '/api/v1/account/address/{id}':
 *  get:
 *    tags:
 *    - Address
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the address
 *       required: true
 *    summary: Get a address by the id
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateAddressAccountResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.get("/address/:id", authentication.execute, addressController.findOne);
/**
 * @openapi
 * '/api/v1/account/address/{id}':
 *  patch:
 *    tags:
 *    - Address
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the address
 *       required: true
 *    summary: Patch a new address by the id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateAddressAccountInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateAddressAccountResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.patch("/address/:id", authentication.execute, addressController.update);
/**
 * @openapi
 * '/api/v1/account/{account_id}/address':
 *  post:
 *    tags:
 *    - Address
 *    parameters:
 *     - name: account_id
 *       in: path
 *       description: The id of the account
 *       required: true
 *    summary: Create a new address by the account id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateAddressAccountInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateAddressAccountResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.post(
  "/:account_id/address",
  authentication.execute,
  authorization.explicitOwner,
  addressController.create
);
/**
 * @openapi
 * '/api/v1/account/address/{id}':
 *  delete:
 *    tags:
 *    - Address
 *    summary: Delete address by  the account id
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the address
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
router.delete("/address/:id", authentication.execute, addressController.delete);

router.get(
  "/:account_id/card",
  authentication.execute,
  authorization.explicitOwner,
  cardController.findOne
);
router.patch("/card/:id", authentication.execute, cardController.update);
router.post("/:account_id/card", authentication.execute, cardController.create);
router.delete("/card/:id", authentication.execute, cardController.delete);

router.get(
  "/order/:order_id/ticket",
  authentication.execute,
  authorization.isOwnerByOrderParam,
  ticketController.find
);

router.get(
  "/order/:order_id",
  authentication.execute,
  authorization.isOwnerByOrderParam,
  orderController.findOne
);

router.get(
  "/:account_id/order/",
  authentication.execute,
  authorization.explicitOwner,
  orderController.find
);

router.patch(
  "/order/:order_id",
  authentication.execute,
  authorization.isOwnerByOrderParam,
  orderController.cancel
);

/**
 * @openapi
 * '/api/v1/account/{id}':
 *  get:
 *    tags:
 *    - Account
 *    summary: Get a single account by the id
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the account
 *       required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateAccountResponse'
 *      400:
 *        description: Bad Request
 *  
 *      401:
 *        description: Unauthorized 
 */
router.get("/:id", authentication.execute, accountController.findOne);
/**
 * @openapi
 * '/api/v1/account/{id}':
 *  patch:
 *    tags:
 *    - Account
 *    summary: Patch account by the id
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the account
 *       required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateAccountInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateAccountResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized 
 */
router.patch("/:id", authentication.execute, accountController.update);
/**
 * @openapi
 * '/api/v1/account':
 *  post:
 *    tags:
 *    - Account
 *    summary: Create a new account
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateAccountInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateAccountResponse'
 *      400:
 *        description: Bad request
 */

router.post("/", accountController.create);
/**
 * @openapi
 * '/api/v1/account/{id}':
 *  delete:
 *    tags:
 *    - Account
 *    summary: Delete account by the id
 *    parameters:
 *     - name: id
 *       in: path
 *       description: The id of the account
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
router.delete("/:id", authentication.execute, accountController.delete);

export default router;

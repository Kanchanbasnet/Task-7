/**
 * @swagger
 * components:
 *      schemas:
 *          Order:
 *              type: object
 *              properties:
 *                  userId:
 *                      type: string
 *                      description: The Id of the user associated with the cart.
 *                      required: true
 *                      example: "64d32e"
 *                  cartId:
 *                      type: string
 *                      description: The Id of the cart associated with the user.
 *                  items:
 *                      type: array
 *                      required: true
 *                      items:
 *                          type: object
 *                          properties:
 *                              productId:
 *                                 type: string
 *                                 description: The ID of the product in the cart
 *                                 example: "648797dfs4s"
 *                              quantity:
 *                                  type: integer
 *                                  description: The quantity of the product in the cart.
 *                                  example: 2
 *                  price:
 *                      type: integer
 */

/**
 * @swagger
 * tags:
 *      name: Orders
 *      description: Operations regarding Orders.
 */


/**
 * @swagger
 * /orders/checkout/{cartId}:
 *   post:
 *     summary: Checkout a cart
 *     description: Checkout a user's cart and generate an order when the minimum order is greater than Rs. 500.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: Id of the Cart.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order Generated Successfully.
 *       400:
 *         description: Minimum Order for checkout is Rs. 500.
 *       500:
 *         description: Internal Server Error.
 */


/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders from the MongoDB.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successful response with order details.
 */

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Get an order by ID.
 *     description: Retrieve an specific order that matches the ID of the order.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order.
 *     responses:
 *       "200":
 *         description: Order of the user retrieved Successfully.
 *       "404":
 *         description: Order not found.
 *       "500":
 *         description: Internal Server Error.
 */
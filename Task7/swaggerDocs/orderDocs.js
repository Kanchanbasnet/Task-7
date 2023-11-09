/**
 * @swagger
 * components:
 *      schemas:
 *          CartItem:
 *              type: object
 *              properties:
 *                  product_id:
 *                      type: integer
 *                      description: The ID of the product.
 *                      example: 1
 *                  quantity:
 *                      type: integer
 *                      description: The quantity of the product in the cart.
 *                      example: 2
 *                  price:
 *                      type: integer
 *                      description: The price of the product.
 *                      example: 50
 *          Order:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The ID of the order.
 *                      example: 1
 *                  user_id:
 *                      type: integer
 *                      description: The ID of the user associated with the order.
 *                      example: 101
 *                  totalprice:
 *                      type: integer
 *                      description: The total price of the order.
 *                      example: 1000
 *                  order_date:
 *                      type: string
 *                      format: date-time
 *                      description: The date and time when the order was placed.
 *                      example: "2023-11-10T12:30:00Z"
 *                  products:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/CartItem'
 */

/**
 * @swagger
 * tags:
 *      name: Orders
 *      description: Operations regarding Orders.
 */

/**
 * @swagger
 * /order/checkout:
 *   post:
 *     summary: Process the checkout for a user's cart
 *     description: Checkout a user's cart and generate an order.
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: cart_id
 *         type: integer
 *         required: true
 *         description: The ID of the user's cart.
 *       - in: query
 *         name: user_id
 *         type: integer
 *         required: true
 *         description: The ID of the user.
 *     responses:
 *       200:
 *         description: Order generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: The total price should be at least 500 to place an order.
 *       404:
 *         description: Cart does not exist or Product not found.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successful response with order details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /order/{user_id}:
 *   get:
 *     summary: Get an order by user ID
 *     description: Retrieve orders for a specific user.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         type: integer
 *         required: true
 *         description: The ID of the user.
 *     responses:
 *       200:
 *         description: Orders for the user retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: User not found or Order does not exist.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /order/top-selling-products:
 *   get:
 *     summary: Get top selling products
 *     description: Retrieve a list of top-selling products.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successful response with top-selling products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       404:
 *         description: No top products found.
 *       500:
 *         description: Internal Server Error.
 */

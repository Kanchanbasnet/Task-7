/**
 * @swagger
 * components:
 *      schemas:
 *          Cart:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The ID of the cart.
 *                      example: 1
 *                  user_id:
 *                      type: integer
 *                      description: The ID of the user associated with the cart.
 *                      example: 1
 *                  totalprice:
 *                      type: integer
 *                      description: The total price of the cart.
 *                      example: 2000
 *                  created_at:
 *                      type: string
 *                      format: date-time
 *                      description: The date and time when the cart was created.
 *                      example: "2023-11-10T12:30:45Z"
 *                  updated_at:
 *                      type: string
 *                      format: date-time
 *                      description: The date and time when the cart was last updated.
 *                      example: "2023-11-10T14:45:30Z"
 *                  items:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              product_id:
 *                                  type: string
 *                                  description: The ID of the product in the cart.
 *                                  example: "648797dfs4s"
 *                              quantity:
 *                                  type: integer
 *                                  description: The quantity of the product in the cart.
 *                                  example: 2
 *                              price:
 *                                  type: integer
 *                                  description: The price of the product in the cart.
 *                                  example: 1000
 */

/**
 * @swagger
 * tags:
 *      name: Cart
 *      description: Operations regarding Cart.
 */

/**
 * @swagger
 * /cart/addToCart:
 *   post:
 *     summary: Add items to the cart
 *     description: Add items to the user's cart or create a new cart if it doesn't exist.
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       description: The ID of the product to add to the cart.
 *                       example: "648797dfs4s"
 *                     quantity:
 *                       type: integer
 *                       description: The quantity of the product to add to the cart.
 *                       example: 2
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user.
 *                 example: 1
 *             required:
 *               - items
 *               - user_id
 *     responses:
 *       200:
 *         description: Cart updated successfully.
 *       400:
 *         description: The quantity of the product is not available or the product is not found.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get all carts
 *     description: Retrieve a list of all carts with their details.
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successful response with cart details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /cart/{id}:
 *   get:
 *     summary: Get a cart by ID
 *     description: Retrieve details of a specific cart based on its ID.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: The ID of the cart.
 *     responses:
 *       200:
 *         description: Cart details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found.
 *       500:
 *         description: Internal Server Error.
 */

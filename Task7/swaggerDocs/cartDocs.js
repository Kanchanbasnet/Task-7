/**
 * @swagger
 * components:
 *      schemas:
 *          Cart:
 *              type: object
 *              properties:
 *                  userId:
 *                      type: string
 *                      description: The Id of the user associated with the cart.
 *                      required: true
 *                      example: "64d32e"
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
 *                      example: 500    
 */


/**
 * @swagger
 * tags:
 *      name: Carts
 *      description: Operations regarding Carts.
 */

/**
 * @swagger
 * /cart/addToCart:
 *   post:
 *     summary: Add items to the Cart.
 *     description: Adding items available to the Cart.
 *     tags: [Carts]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       "200":
 *         description: "Cart updated Successfully."
 *       "404":
 *         description: "Product Does not exist."
 *       "500":
 *         description: "Internal Server Error."
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get all shopping carts.
 *     tags: [Carts]
 *     responses:
 *       "200":
 *         description: A list of all shopping carts.
 *       "404":
 *         description: No shopping carts found.
 *       "500":
 *         description: Internal Server Error.
 */


/**
 * @swagger
 * /cart/{cartId}:
 *   get:
 *     summary: Get a shopping cart by ID.
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the shopping cart.
 *     responses:
 *       "200":
 *         description: Shopping cart retrieved successfully.
 *       "404":
 *         description: Shopping cart not found.
 *       "500":
 *         description: Internal Server Error.
 */

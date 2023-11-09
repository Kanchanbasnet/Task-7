/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  product_id:
 *                      type: integer
 *                      description: The ID of the product.
 *                      example: 1
 *                  product_name:
 *                      type: string
 *                      description: The name of the product.
 *                      example: "Product ABC"
 *                  description:
 *                      type: string
 *                      description: The description of the product.
 *                      example: "A high-quality product."
 *                  price:
 *                      type: integer
 *                      description: The price of the product.
 *                      example: 50
 *                  quantity:
 *                      type: integer
 *                      description: The quantity of the product.
 *                      example: 100
 *                  product_type:
 *                      type: string
 *                      description: The type/category of the product.
 *                      example: "Electronics"
 *                  product_image:
 *                      type: string
 *                      description: The filename of the product image.
 *                      example: "product_image.jpg"
 *                  search_count:
 *                      type: integer
 *                      description: The count of times the product has been searched.
 *                      example: 5'
 */

/**
 * @swagger
 * tags:
 *      name: Products
 *      description: Operations regarding Products.
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful response with product details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve details of a specific product based on its ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: The ID of the product.
 *     responses:
 *       200:
 *         description: Product details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Product with the given ID does not exist.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /products/out-of-stock:
 *   get:
 *     summary: Get out-of-stock products
 *     description: Retrieve a list of out-of-stock products.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful response with out-of-stock products.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: No out-of-stock products found.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided details.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               product_type:
 *                 type: string
 *               product_image:
 *                 type: file
 *             required:
 *               - product_name
 *               - price
 *               - quantity
 *               - product_type
 *     responses:
 *       200:
 *         description: Product created successfully.
 *       409:
 *         description: Product already exists.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /products/updateQuantity/{id}:
 *   patch:
 *     summary: Update quantity of a product
 *     description: Update the quantity of a product based on its ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: The ID of the product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *             required:
 *               - quantity
 *     responses:
 *       200:
 *         description: Product quantity updated successfully.
 *       400:
 *         description: Product with the given ID does not exist.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     description: Update the details of a product based on its ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: The ID of the product.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               product_type:
 *                 type: string
 *               product_image:
 *                 type: string
 *             required:
 *               - product_name
 *               - price
 *               - quantity
 *               - product_type
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       400:
 *         description: Product with the given ID does not exist.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /products/delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product based on its ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: The ID of the product.
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       404:
 *         description: Product with the given ID does not exist.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search for products
 *     description: Search for products based on a keyword.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         type: string
 *         required: true
 *         description: The keyword to search for.
 *     responses:
 *       200:
 *         description: Successful response with search results.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: No results found for the given keyword.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * products/topProducts:
 *   get:
 *     summary: Get top ten products
 *     description: Retrieve a list of top ten products based on search count.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful response with top ten products.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal Server Error.
 */

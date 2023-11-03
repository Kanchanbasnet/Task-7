/**
 * @swagger
 * tags:
 *      name: Products
 *      description: Operations regarding Products.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: integer
 *         description:
 *           type: string
 *         quantity:
 *           type: integer
 *         productType:
 *           type: string
 *         image:
 *           type: file
 *       example:
 *         productId: "65d34"
 *         name: "Laptop"
 *         price: 999
 *         description: "A high-end Latest Laptop of Nepal."
 *         quantity: 4
 *         productType: "Electronics"
 *         image: "user123.jpg"
 */

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided information and an optional image upload.
 *     tags: [Products]
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: integer
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               productType:
 *                 type: string
 *               image:
 *                 type: file
 *     responses:
 *       200:
 *         description: Product created successfully.
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Check your input data.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products with their details.
 *     description: Retrieve a list of all Products from the MongoDB.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful response with Products details.
 */

/**
 * @swagger
 * /products/outOfStock:
 *   get:
 *     summary: Get products that are out of stock.
 *     description: Retrieve a list of products that are out of stock.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful response with out-of-stock products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */


/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieve a product by its unique ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with product details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing Product by ID with File Upload
 *     description: Update an existing Product with the provided information and optional file upload.
 *     tags: [Products] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: integer
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               productType:
 *                 type: string
 *               image:
 *                 type: file 
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Check your input data.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     description: Delete a product by their unique ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product is deleted Successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 */

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update an existing Product's quantity by ID
 *     description: Update the quantity of an existing product with the provided quantity value.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:   
 *           schema:
 *             type: object
 *             properties:
 *               quantity:   
 *                 type: integer
 *                 description: The new quantity value for the product.
 *     responses:
 *       200:
 *         description: Product quantity updated successfully.
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Check your input data.
 *       500:
 *         description: Internal Server Error.
 */
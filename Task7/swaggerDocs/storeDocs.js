/**
 * @swagger
 * components:
 *  schemas:
 *   Store:
 *     type: object
 *     properties:
 *       storename:
 *         type: string
 *         description: Name of the store
 *         required: true
 *         example: "My Store"
 *       logo:
 *         type: string
 *         description: Logo of the Store
 *         required: true
 *         example: "store.png"
 *       image:
 *         type: string
 *         description: Image of the store.
 *         required: true
 *         example: "storeimage.jpg"
 *       storeType:
 *         type: string
 *         enum:
 *           - Electronics
 *           - Grocery
 *           - Clothing
 *           - Stationery
 *         description: Type of the Store
 *         required: true
 *         example: "Grocery"
 *       address:
 *         type: string
 *         description: Address of the Store
 *         required: true
 *         example: "Kathmandu"
 *       location:
 *         type: object
 *         properties:
 *           type:
 *             type: string
 *             enum:
 *               - Point
 *             default: "Point"
 *           coordinates:
 *             type: array
 *             items:
 *               type: number
 *         description: Geospatial location of the store
 *         required: true
 *         example:
 *           type: "Point"
 *           coordinates: [longitude, latitude]
 *       user:
 *         type: string
 *         description: The ID of the user associated with the store
 *         example: "user123"
 *       products:
 *         type: array
 *         items:
 *           type: string
 *         description: An array of product IDs associated with the store
 */


/**
 * @swagger
 * tags:
 *      name: Stores
 *      description: Operations regarding Stores.
 */

/**
 * @swagger
 * /store/create:
 *   post:
 *     summary: Create a new store
 *     description: Creating a new store.
 *     tags: [Stores]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               storeName:
 *                 type: string
 *               logo:
 *                 type: file
 *               image:
 *                 type: file
 *               storeType:
 *                 type: string
 *                 enum: ['Electronics', 'Grocery', 'Clothing', 'Stationery']
 *               address:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       "201":
 *         description: Store created Successfully.
 *       "400":
 *         description: Store already exists.
 *       "500":
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /store:
 *   get:
 *     summary: Get all stores
 *     description: To retrieve all the stores in the MongoDB
 *     tags: [Stores]
 *     responses:
 *       "200":
 *         description: A list of all stores.
 *       "404":
 *         description: No stores found.
 *       "500":
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /store/findNearestStore:
 *   post:
 *     summary: Find the nearest stores
 *     description: Find the nearby store by sending Latitude and longitude in the request body.
 *     tags: [Stores]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       "200":
 *         description: Nearest stores found successfully.
 *       "404":
 *         description: No stores found.
 *       "500":
 *         description: Internal Server Error.
 */
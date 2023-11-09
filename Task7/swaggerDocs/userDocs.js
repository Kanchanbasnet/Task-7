/**
 * @swagger
 * components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The ID of the user.
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The name of the user.
 *                      example: "John Doe"
 *                  email:
 *                      type: string
 *                      description: The email of the user.
 *                      example: "john.doe@example.com"
 *                  address:
 *                      type: string
 *                      description: The address of the user.
 *                      example: "123 Main St, City"
 */

/**
 * @swagger
 * tags:
 *      name: Users
 *      description: Operations regarding Users.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response with user details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve details of a specific user based on their ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: The ID of the user.
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided details.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *     responses:
 *       200:
 *         description: User created successfully.
 *       409:
 *         description: User with the given email already exists.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update the details of a user based on their ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: The ID of the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User with the given ID does not exist.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user based on their ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: The ID of the user.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User with the given ID does not exist.
 *       500:
 *         description: Internal Server Error.
 */

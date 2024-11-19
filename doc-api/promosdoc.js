/**
 * @openapi
 * tags:
 *   name: Promos
 *   description: Operations related to promos
 */

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Promo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "609c25e8341b4a0012a0c123"
 *         name:
 *           type: string
 *           example: "Promo 2023"
 *         students:
 *           type: array
 *           items:
 *             type: string
 *           example: ["60b8a3d9c421f722e9d2d123", "60b8a3d9c421f722e9d2d456"]
 *         startDate:
 *           type: string
 *           format: date
 *           example: "2024-01-15"
 *         endDate:
 *           type: string
 *           format: date
 *           example: "2024-12-15"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-10T15:30:00Z"
 */

/**
 * @openapi
 * /promos:
 *   get:
 *     summary: Get all promos
 *     tags: [Promos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         description: Your API key (Bearer token)
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Promo'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid request data"
 *   post:
 *     summary: Create a new promo
 *     tags: [Promos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         description: Your API key (Bearer token)
 *     requestBody:
 *       description: Promo data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Promo'
 *           example:
 *             name: "Promo 2023"
 *             startDate: "2024-01-15"
 *             endDate: "2024-12-15"
 *             formationDescription : "Developpeur web et web mobile" 
 *     responses:
 *       '201':
 *         description: Promo created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Created with success"
 *       '400':
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error"
 */

/**
 * @openapi
 * /promos/{id}:
 *   get:
 *     summary: Get a promo by ID
 *     tags: [Promos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         description: Your API key (Bearer token)
 *       - in: path
 *         name: id
 *         required: true
 *         description: Promo ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promo'
 *       '404':
 *         description: Promo not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Promo not found"
 *   put:
 *     summary: Update a promo by ID
 *     tags: [Promos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         description: Your API key (Bearer token)
 *       - in: path
 *         name: id
 *         required: true
 *         description: Promo ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated promo data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Promo'
 *           example:
 *             name: "Updated Promo 2023"
 *             startDate: "2024-02-01"
 *             endDate: "2024-11-30"
 *             formationDescription : "Developpeur web et web mobile"  
 *     responses:
 *       '200':
 *         description: Promo updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Updated with success"
 *       '404':
 *         description: Promo not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Promo not found"
 *   delete:
 *     summary: Delete a promo by ID
 *     tags: [Promos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         description: Your API key (Bearer token)
 *       - in: path
 *         name: id
 *         required: true
 *         description: Promo ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Promo deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Promo deleted successfully"
 *       '404':
 *         description: Promo not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Promo not found"
 */

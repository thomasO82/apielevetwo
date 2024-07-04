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
 *             example:
 *               message: Promos retrieved successfully
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
 *           example:
 *             name: Promo 2023
 *     responses:
 *       '201':
 *         description: Promo created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Promo created successfully
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
 *             example:
 *               message: Promo retrieved successfully
 *       '404':
 *         description: Promo not found
 *         content:
 *           application/json:
 *             example:
 *               message: Promo not found
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
 *           example:
 *             name: Updated Promo 2023
 *     responses:
 *       '200':
 *         description: Promo updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Promo updated successfully
 *       '404':
 *         description: Promo not found
 *         content:
 *           application/json:
 *             example:
 *               message: Promo not found
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
 *               message: Promo deleted successfully
 *       '404':
 *         description: Promo not found
 *         content:
 *           application/json:
 *             example:
 *               message: Promo not found
 */

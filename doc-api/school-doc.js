/**
 * @openapi
 * /school:
 *   post:
 *     summary: Create a new school
 *     tags: [Schools]
 *     requestBody:
 *       description: School data to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "OpenAI Academy"
 *                 description: The name of the school
 *               email:
 *                 type: string
 *                 example: "contact@openai.academy"
 *                 description: Contact email of the school
 *               password:
 *                 type: string
 *                 example: "password123"
 *                 description: Password for the school account (min 8 characters, including a digit)
 *               confirmPassword:
 *                 type: string
 *                 example: "password123"
 *                 description: Confirmation of the password
 *     responses:
 *       '201':
 *         description: School created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Created with success"
 *       '400':
 *         description: Validation error (e.g., unique constraints or missing required fields)
 *         content:
 *           application/json:
 *             example:
 *               errors:
 *                 email:
 *                   message: "Ce champ doit être unique."
 *                 password:
 *                   message: "Le mot de passe doit avoir au moins 8 caractères et contenir au moins un chiffre."
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 *
 * /me:
 *   get:
 *     summary: Retrieve the logged-in school's details
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: School details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "OpenAI Academy"
 *                   description: Name of the school
 *                 email:
 *                   type: string
 *                   example: "contact@openai.academy"
 *                   description: Contact email of the school
 *                 slug:
 *                   type: string
 *                   example: "openai-academy"
 *                   description: Slug generated from the school name
 *                 promos:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "605c72b8c2a1c2b4f4d634e9"
 *                     description: List of promo IDs associated with the school
 *       '400':
 *         description: Bad request, unable to retrieve school details
 *         content:
 *           application/json:
 *             example:
 *               message: "Unable to retrieve school details"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */

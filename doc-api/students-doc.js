/**
 * @openapi
 * tags:
 *   name: Students
 *   description: Operations related to students
 */

/**
 * @openapi
 * /promos/{promoId}/students:
 *   post:
 *     summary: Create a new student in a promo
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         description: Your API key (Bearer token)
 *       - in: path
 *         name: promoId
 *         required: true
 *         description: Promo ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Student data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       '201':
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Created with success
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /promos/{promoId}/students/{studentId}:
 *   put:
 *     summary: Update a student in a promo
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         description: Your API key (Bearer token)
 *       - in: path
 *         name: promoId
 *         required: true
 *         description: Promo ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated student data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       '200':
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Updated with success
 *       '404':
 *         description: Promo or Student not found
 *       '500':
 *         description: Internal Server Error
 *   delete:
 *     summary: Delete a student from a promo
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         description: Your API key (Bearer token)
 *       - in: path
 *         name: promoId
 *         required: true
 *         description: Promo ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Student deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: deleted with success
 *       '404':
 *         description: Promo or Student not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @openapi
 * tags:
 *   - name: Promos
 *     description: Operations related to promos
 *   - name: Students
 *     description: Operations related to students in promos
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           example: "Alice"
 *         lastName:
 *           type: string
 *           example: "Martin"
 *         age:
 *           type: integer
 *           example: 22
 *         avatar:
 *           type: string
 *           format: binary
 *
 * /promos/{promoId}/students:
 *   post:
 *     summary: Create a new student in a specific promo
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: promoId
 *         required: true
 *         description: ID of the promo to which the student will be added
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Student data to be created
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       '201':
 *         description: Student created successfully
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
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 *
 * /promos/{promoId}/students/{studentId}:
 *   put:
 *     summary: Update a student's details within a specific promo
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: promoId
 *         required: true
 *         description: ID of the promo containing the student to update
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: The ID of the student to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The updated student data
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       '200':
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Updated with success"
 *       '404':
 *         description: Student or promo not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Promo or Student not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 *
 *   delete:
 *     summary: Remove a student from a specific promo
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: promoId
 *         required: true
 *         description: ID of the promo containing the student
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: The ID of the student to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Student deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Deleted with success"
 *       '404':
 *         description: Student or promo not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Promo or Student not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 *
 * /promos/{promoId}/students/{studentId}/avatar:
 *   get:
 *     summary: Retrieve a student's avatar if available
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: promoId
 *         required: true
 *         description: ID of the promo to which the student belongs
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: The ID of the student to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Returns the avatar image if it exists.
 *         content:
 *           application/json:
 *             example:
 *               firstName: "Alice"
 *               lastName: "Martin"
 *               age: 22
 *               avatar: "alice-avatar.jpg"
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *             description: Returns the student's avatar image if available.
 *       '404':
 *         description: Student or promo not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Cette ressource n'appartient pas à votre école"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Erreur lors de la récupération de l'étudiant"
 */

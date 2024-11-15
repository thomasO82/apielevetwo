/**
 * @openapi
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
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Alice"
 *               lastName:
 *                 type: string
 *                 example: "Martin"
 *               age:
 *                 type: integer
 *                 example: 22
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Created with success"
 *       '400':
 *         description: Validation Error
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
 *   get:
 *     summary: Retrieve a student's details by their ID within a specific promo
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
 *         description: Student details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               firstName: "Alice"
 *               lastName: "Martin"
 *               age: 22
 *               avatar: "alice-avatar.jpg"
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
 *
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
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Alice"
 *               lastName:
 *                 type: string
 *                 example: "Martin"
 *               age:
 *                 type: integer
 *                 example: 23
 *               avatar:
 *                 type: string
 *                 format: binary
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
 */

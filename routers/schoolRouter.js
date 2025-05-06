const schoolRouter = require("express").Router()
const schoolController = require("../controllers/schoolController")
const authGuard = require("../helper/authGuard")

schoolRouter.post('/schools', schoolController.createSchool)
schoolRouter.patch('/schools', authGuard, schoolController.patchSchool)
schoolRouter.get('/schools/me', authGuard, schoolController.getMe)

module.exports = schoolRouter

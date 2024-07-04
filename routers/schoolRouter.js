const schoolRouter = require("express").Router()
const schoolController = require("../controllers/schoolController")
const authguard = require("../helper/authGuard")


schoolRouter.post('/school', schoolController.createSchool)
schoolRouter.get('/me', authguard, schoolController.getMe)


module.exports = schoolRouter

const schoolRouter = require("express").Router()
const schoolController = require("../controllers/schoolController")
const authGuard = require("../helper/authGuard")
const authguard = require("../helper/authGuard")


schoolRouter.post('/school', schoolController.createSchool)
schoolRouter.patch('/school',authGuard, schoolController.patchSchool)
schoolRouter.get('/me', authguard, schoolController.getMe)


module.exports = schoolRouter

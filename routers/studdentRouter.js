const studdentRouter = require("express").Router()
const studdentController = require("../controllers/studdentController")
const authguard = require("../helper/authGuard")


studdentRouter.post('/promos/:promoId/students',authguard, studdentController.createStudent)
studdentRouter.put('/promos/:promoId/students/:studdentId',authguard, studdentController.updateStuddent)
studdentRouter.delete('/promos/:promoId/students/:studdentId',authguard, studdentController.deleteStudent)




module.exports = studdentRouter
const studdentRouter = require("express").Router()
const studdentController = require("../controllers/studdentController")
const authguard = require("../helper/authGuard")
const upload = require("../helper/upload")


studdentRouter.post('/promos/:promoId/students',authguard,upload.single('avatar'), studdentController.createStudent)
studdentRouter.put('/promos/:promoId/students/:studdentId',authguard,upload.single('avatar'), studdentController.updateStuddent)
studdentRouter.delete('/promos/:promoId/students/:studdentId',authguard, studdentController.deleteStudent)
studdentRouter.get('/promos/:promoId/students/:studdentId/avatar',authguard, studdentController.getStudent)
studdentRouter.get('/test',(req,res)=>{
    res.status(200).json({message:"test"})
})


module.exports = studdentRouter
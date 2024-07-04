const promoRouter = require("express").Router()
const promoController = require("../controllers/promoController")
const authguard = require("../helper/authGuard")

promoRouter.get('/promos', authguard, promoController.getPromos)
promoRouter.get('/promos/:id', authguard, promoController.getOnePromo)
promoRouter.post('/promos', authguard, promoController.postPromo)
promoRouter.put('/promos/:id', authguard, promoController.updatePromo)
promoRouter.delete('/promos/:id', authguard, promoController.deletePromo)



module.exports = promoRouter
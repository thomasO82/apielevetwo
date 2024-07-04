const express = require('express')
const app = express()
const mongoose = require("mongoose")
const promoRouter = require("./routers/promoRouter")
const rateLimit = require('express-rate-limit');
const schoolRouter = require('./routers/schoolRouter');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const studdentRouter = require('./routers/studdentRouter');
const cors = require('cors')

require("dotenv").config()
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Votre API',
            version: '1.0.0',
            description: 'Description de votre API',
        },
    },
    apis: ['./doc-api/*.js'],
})));

app.use(rateLimit({
    windowMs: 1000,
    max: 50,
    message: 'Trop de requêtes depuis cette adresse IP, veuillez réessayer après un moment.',
    handler: (req, res) => {
        res.status(429).json({ error: 'Too Many Requests' });
    },
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(promoRouter)
app.use(schoolRouter)
app.use(studdentRouter)


console.log("connection in process....");
mongoose.connect(process.env.MONGOURI).then(() => {
    app.listen(process.env.PORT, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`server listening on port ${process.env.PORT}`);
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 3);


        }
    })
}).catch((error) => {
    console.log(error);
})


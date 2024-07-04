const schoolModel = require('../models/schoolModel')
const mailer = require('../helper/mailer')

exports.createSchool = async(req,res)=>{
    try {
        const school = new schoolModel(req.body);
        const apikey = school.encryptedApiKey
        await school.validate(); 
        await school.save();
        mailer.sendMail({
            from: process.env.LOG_MAILER,
            to: school.email,
            subject: "Votre clef d'api",
            html: `Bonjour, Voici votre clef secrete a utiliser pour vous connecter a mon api : ${apikey}`
          })
        res.status(201).json({ message: 'Created with success' });
    } catch (error) {
        if (error.name === 'ValidationError') {
           console.log(error);
            res.status(400).json(error);
        } else {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

exports.getMe = async(req,res)=>{
    try {
     const school = await schoolModel.findOne({ _id: req.school});
     res.status(200).json(school)
      
        
    } catch (error) {
        res.status(400).json(error)
    }
}

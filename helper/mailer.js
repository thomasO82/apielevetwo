const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.LOG_MAILER,
        pass: process.env.MDP_MAILER
    }
})


exports.sendMail = (mailOptions)=>{
    transporter.sendMail(mailOptions, function (error, info) {
        console.log(mailOptions);
        if (error) {
          console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        } else {
          console.log('E-mail envoyé avec succès :', info.response);
        }
      });
} 
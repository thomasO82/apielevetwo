const mongoose = require('mongoose');
const schoolModel = require('../models/schoolModel');
const helperCrypto = require('../helper/uid');

const authGuard = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Token d'authentification manquant ou invalide." });
        }

        const apiKey = authHeader.split(' ')[1];
        const school = await schoolModel.findOne({ encryptedApiKey: apiKey }).select('+encryptedApiKey');

        if (!school) {
            return res.status(401).json({ message: "API key invalide." });
        }

        req.school = school._id;
        next();
    } catch (error) {
        console.error("Erreur dans le middleware authGuard:", error);
        return res.status(500).json({ message: "Erreur interne du serveur." });
    }
};

module.exports = authGuard;

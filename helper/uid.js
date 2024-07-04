const crypto = require("crypto");
const secretKey = process.env.ENCRYPTION_KEY;

exports.hash = (text) => {
    const hash = crypto.createHash('sha256');
    hash.update(text, 'utf-8');
    return hash.digest('hex');
};
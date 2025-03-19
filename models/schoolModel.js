const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const helperUid = require('../helper/uid')
const mailer = require('../helper/mailer')
const bcryp = require('bcrypt')
const slugify = require('slugify');


const schoolSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String,
        require: [true, "le nom de votre ecole est requis"],
        validate: {
            validator: function (value) {
                return /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9' ]{3,30}$/.test(value);            },
            message: "Le champ 'name' doit avoir au moins 5 caractères et être alphanumérique."
        }
    },
    slug: {
        type: String,
        unique: true,
    },
    email: {
        unique: true,
        type: String,
        require: [true, "le mail de contact de votre ecole est requis"],
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
            },
            message: "Le champ 'mail' doit correspondre un un email"
        }
    },
    password: {
        select: false,
        type: String,
        require: [true, "le mot de passe est requis"],
        validate: {
            validator: function (value) {
                return /^(?=.*\d).{8,}$/.test(value);
            },
            message: "Le mot de passe doit avoir au moins 8 caractères et contenir au moins un chiffre."
        }
    },
    confirmPassword: {
        select: false,
        type: String,
        require: [true, "le champ de confirmation du mot de passe est requis"],
        select: false
    },
    promos: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "promos"
        }
    ],
    encryptedApiKey: {
        select: false,

        type: String,
        default: uuidv4,
        unique: true,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    }
})


schoolSchema.post('save', function (error, doc, next) {
    console.log(error);
    if (error.code === 11000) {
        const keyPattern = error.keyPattern;
        const violatedFields = Object.keys(keyPattern);
        const validationErrors = {};
        violatedFields.forEach(field => {
            validationErrors[field] = {
                message: 'Ce champ doit être unique.',
                kind: 'unique',
                path: field,
                value: doc[field],
            };
        });
        
        const validationError = new mongoose.Error.ValidationError(this);
        validationError.errors = validationErrors;
        next(validationError);
    } else {
        next();
    }
});

schoolSchema.pre('save', function (next) {
    try {
        const doc = this
        if (this.password != this.confirmPassword) {
            throw new Error('les mots de passes ne correspondent pas');
        }
        delete this._doc.confirmPassword;        
        this.password = bcryp.hashSync(this.password, parseInt(process.env.BCRYPT_SALT))     
        this.slug = slugify(this.name, { lower: true });
        this.createdAt = new Date();
        this.encryptedApiKey = helperUid.hash(this.encryptedApiKey);

        next();
    } catch (error) {
        next(error);
    }
});



schoolSchema.pre('updateOne', function (next) {
    try {
        this._update.updatedAt = new Date();
        next();
    } catch (error) {
        next(error);
    }
});

const schoolModel = mongoose.model('schools', schoolSchema);

module.exports = schoolModel

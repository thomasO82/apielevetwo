const mongoose = require("mongoose");
const schoolModel = require("./schoolModel");


const promoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Le champ nom est requis"],
        validate: {
            validator: function (value) {
                return /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9' ]{3,30}$/.test(value);
            },
            message: "Le champ 'name' doit avoir au moins 5 caractères et être alphanumérique."
        }
    },
    students: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "students"
        }
    ],
    startDate: {
        required: [true, "le champs début de la promo est requis"],
        type: Date,
        validate: {
            validator: function (value) {
                return value > Date.now();
            },
            message: "La date de début doit être ultérieure à la date actuelle."
        }
    },
    endDate: {
        required: [true, "le champs fin de la promo est requis"],
        type: Date,
        validate: {
            validator:  function(value)  {
                console.log(this.get("startDate"));
                
                return value > this.get("startDate")
            },
            message: "La date de fin doit être ultérieure à la date de début."
        }
    },
    formationDescription: {
        type: String,
        validate: {
            validator: function (value) {
                return /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9' ]{3,100}$/.test(value);
            },
            message: "Le champ 'description' doit avoir au moins 5 caractères et être alphanumérique."
        }
    },
    createdAt: {
        type: Date,
        require: true
    },
    updatedAt: {
        type: Date,
        require: true
    }

});

promoSchema.pre('save', function (next) {
    try {
        this.createdAt = new Date()
        next()
    } catch (error) {
        next(error)
    }
});

promoSchema.post('save', function (error, doc, next) {
    try {
        this.createdAt = new Date()
        next()
    } catch (error) {
        next(error)
    }
});


promoSchema.pre('updateOne', function (next) {
    try {
        this._update.updatedAt = new Date();
        next();
    } catch (error) {
        next(error);
    }
});
const promoModel = mongoose.model('promos', promoSchema);

module.exports = promoModel

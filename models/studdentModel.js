const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Le prénom est requis"],
    validate: {
      validator: function (value) {
        return /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9' ]{3,30}$/.test(value);      },
      message: "Entrez un nom avec des caracteres alphabetique valide"
    }
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-ZÀ-ÖØ-öø-ÿ' ]{3,30}$/.test(value);

      },
      message: "Entrez un prénom avec des caracteres alphabetique valide"
    }
  },
  age: {
    type: Number,
    required: [true, "l'age est requis"],
    min: 18,
    max: 62
  },
  avatar:{
    type: String,
    validate: {
      validator: function (value){
        return /^[^\/:*?"<>|]+\.[a-zA-Z0-9]+$/.test(value)
      },
      message: "le nom de l'image est invalide"
    }
   
  }
});

const Student = mongoose.model('students', studentSchema);

module.exports = Student;

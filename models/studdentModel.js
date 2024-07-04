const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Le prénom est requis"],
    validate: {
      validator: function (value) {
        return /^[a-zA-ZÀ-ÖØ-öø-ÿ]{3,}$/.test(value);
      },
      message: "Entrez un nom avec des caracteres alphabetique valide"
    }
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-ZÀ-ÖØ-öø-ÿ]{3,}$/.test(value);
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
});

const Student = mongoose.model('students', studentSchema);

module.exports = Student;

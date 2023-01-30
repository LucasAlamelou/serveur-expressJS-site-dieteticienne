const mongoose = require('mongoose');

// Crée l'object pour la bdd
const FormContactSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: Number, require: true },
  message: { type: String, require: false },
});

const FormContact = new mongoose.model('FormContact', FormContactSchema);

module.exports = FormContact;

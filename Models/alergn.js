const mongoose = require('mongoose');

// Crée l'object pour la bdd
const AllergnSchema = new mongoose.Schema({
  name: { type: String, require: true },
});

const Allergn = new mongoose.model('Allergn', AllergnSchema);

module.exports = Allergn;

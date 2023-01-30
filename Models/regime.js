const mongoose = require('mongoose');

// Crée l'object pour la bdd
const RegimeSchema = new mongoose.Schema({
  name: { type: String, require: true },
});

const Regime = new mongoose.model('Regime', RegimeSchema);

module.exports = Regime;

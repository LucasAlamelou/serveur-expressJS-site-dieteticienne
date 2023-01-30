const mongoose = require('mongoose');

// Crée l'object pour la bdd
const RecetteSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  timePrepare: { type: Number, require: false },
  timeRest: { type: Number, require: false },
  timeCooking: { type: Number, require: false },
  ingredients: { type: [String], require: false },
  calories: { type: Number, require: false },
  steps: { type: String, require: true },
  allergn: { type: [mongoose.Schema.Types.ObjectId], ref: 'Allergn', require: false },
  regime: { type: [mongoose.Schema.Types.ObjectId], ref: 'Regime', require: false },
  note: { type: Number, default: 0, max: 5, require: false },
  isUserOnly: { type: Boolean, default: false, require: false },
});

const Recette = new mongoose.model('Recette', RecetteSchema);

module.exports = Recette;

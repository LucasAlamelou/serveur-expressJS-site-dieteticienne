// Import des différents modèles de base
const User = require('./user');
const Recette = require('./recette');
const Allergn = require('./alergn');
const Regime = require('./regime');
const FormContact = require('./formContact');

// Export vers App.js
module.exports = { User, Recette, Allergn, Regime, FormContact };

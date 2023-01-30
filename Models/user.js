const mongoose = require('mongoose');

// Crée l'object pour la bdd
const UserSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  token: { type: String, require: true },
  salt: { type: String, require: true },
  hash: { type: String, require: true },
  allergn: { type: [mongoose.Schema.Types.ObjectId], ref: 'Allergn', require: false },
  regime: { type: [mongoose.Schema.Types.ObjectId], ref: 'Regime', require: false },
  role: { type: Number, default: 1 },
});

const User = new mongoose.model('User', UserSchema);

module.exports = User;

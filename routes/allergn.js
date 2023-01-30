const {
  allergnCreate,
  getAllergns,
  modifyAllergn,
  removeAllergn,
} = require('../Controllers/allergn');

// Toutes les routes pour allergn

function allergnRoute(app) {
  // Create allergn
  app.post('/allergnCreate', allergnCreate);

  // Get allergns
  app.get('/allergns', getAllergns);

  // Modify allergn
  app.post('/allergnModify', modifyAllergn);

  // Delete allergn
  app.delete('/allergnDelete', removeAllergn);
}

module.exports = allergnRoute;

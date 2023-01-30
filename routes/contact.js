const { formContactCreate } = require('../Controllers/formContact');

// Toutes les routes pour users

function formContactRoute(app) {
  // Create form contact
  app.post('/formContactCreate', formContactCreate);
}

module.exports = formContactRoute;

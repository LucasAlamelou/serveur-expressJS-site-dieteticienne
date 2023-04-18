const { regimeCreate, getRegimes, modifyRegime, removeRegime } = require('../Controllers/regime');

// Toutes les routes pour regime

function regimeRoute(app) {
    // Create regime
    app.post('/regimeCreate', regimeCreate);

    // Get regimes
    app.get('/regimes', getRegimes);

    // Modify regime
    app.put('/regimeModify', modifyRegime);

    // Delete regime
    app.delete('/regimeDelete', removeRegime);
}

module.exports = regimeRoute;

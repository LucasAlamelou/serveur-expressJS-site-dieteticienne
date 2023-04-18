const {
    recetteCreate,
    getRecettesWithToken,
    getRecettesWihoutToken,
    modifyRecette,
    removeRecette,
    addNote,
} = require('../Controllers/recette');

// Toutes les routes pour users

function recetteRoute(app) {
    // Create user
    app.post('/recetteCreate', recetteCreate);

    // Get recettes
    app.get('/recettes/:token', getRecettesWithToken);

    app.get('/recettes', getRecettesWihoutToken);

    // Modify recette
    app.put('/recetteModify', modifyRecette);

    // Delete recette
    app.delete('/recetteDelete', removeRecette);

    // Add note in recette
    app.post('/recetteAddNote', addNote);
}

module.exports = recetteRoute;

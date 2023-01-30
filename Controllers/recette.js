/**
 * Crée une recette avec les elements dans req.body
 * @param {*} req
 * @param {*} res
 * @returns response json
 */
async function recetteCreate(req, res) {
  try {
    if (req.role !== 2) {
      return res.json({
        status: 'error',
        message: 'Not authorized',
      });
    }
    const Recette = req.app.get('models').Recette;
    const NewRecette = await new Recette({
      title: req.body.title,
      description: req.body.description,
      timePrepare: req.body.timePrepare,
      timeRest: req.body.timeRest,
      timeCooking: req.body.timeCooking,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      calories: req.body.calories,
      allergn: req.body.allergns,
      regime: req.body.regimes,
    }).save();
    if (NewRecette) {
      return res.json({
        status: 'ok',
        message: 'Recette create success',
      });
    }
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Catch error',
    });
  }
}

/**
 * Recupère la liste de tout les recettes pour le public
 * @param {*} req
 * @param {*} res
 * @returns json array d'object des recettes
 */
async function getRecettesWithToken(req, res) {
  try {
    const Recette = req.app.get('models').Recette;
    const User = req.app.get('models').User;
    const toCheckUser = await User.findOne({ token: req.params.token });
    if (toCheckUser) {
      const listRecette = await Recette.find({});
      return res.json({
        status: 'ok',
        message: 'List of Recettes',
        listRecette: listRecette,
      });
    }
    return res.json({
      status: 'error',
      message: 'You cannot access this route',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Catch error',
    });
  }
}

/**
 * Recupère la liste de tout les recettes pour le public
 * @param {*} req
 * @param {*} res
 * @returns json array d'object des recettes
 */
async function getRecettesWihoutToken(req, res) {
  try {
    const Recette = req.app.get('models').Recette;
    const listRecette = await Recette.find({ isUserOnly: false });
    return res.json({
      status: 'ok',
      message: 'List of Recettes',
      listRecette: listRecette,
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Catch error',
    });
  }
}

/**
 * Modifie une recette
 * @param {*} req
 * @param {*} res
 * @returns json message
 */
async function modifyRecette(req, res) {
  try {
    if (req.role !== 2) {
      return res.json({
        status: 'error',
        message: 'Not authorized',
      });
    }
    if (!req.body.modify) {
      return res.json({
        status: 'error',
        message: 'Fields missing',
      });
    }
    if (!req.body._id) {
      return res.json({
        status: 'error',
        message: 'Fields id recette missing',
      });
    }

    // Récupère la recette par l'id
    const Recette = req.app.get('models').Recette;
    const idRecetteModify = req.body._id;
    const objetModify = req.body.modify;
    const RecetteUpdate = Recette.findByIdAndUpdate(
      idRecetteModify,
      objetModify,
      { upsert: false },
      (err) => {
        if (err) {
          return res.json({
            status: 'error',
            message: 'Recette not found or something like that',
          });
        }
      }
    );
    if (!RecetteUpdate) {
      return res.json({
        status: 'error',
        message: 'Recette not found or something like that',
      });
    }
    return res.json({
      status: 'ok',
      message: 'Recette modify to success',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Catch error',
    });
  }
}

/**
 * Supprime une recette
 * @param {*} req
 * @param {*} res
 * @returns json message
 */
async function removeRecette(req, res) {
  try {
    if (req.role !== 2) {
      return res.json({
        status: 'error',
        message: 'Not authorized',
      });
    }
    if (!req.body._id) {
      return res.json({
        status: 'error',
        message: 'Fields id user missing',
      });
    }

    // Récupère l'user par l'id
    const Recette = req.app.get('models').Recette;
    const ToDeleteRecette = await Recette.findById(req.body._id);
    if (!ToDeleteRecette) {
      return res.json({
        status: 'error',
        message: 'Recette not found or something like that',
      });
    }
    await ToDeleteRecette.remove().catch(() => {
      return res.json({
        status: 'error',
        message: 'Recette found but error in delete',
      });
    });
    return res.json({
      status: 'ok',
      message: 'Recette delete success',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Catch error',
    });
  }
}

/**
 * Modifie une recette
 * @param {*} req
 * @param {*} res
 * @returns json message
 */
async function addNote(req, res) {
  try {
    if (!req.body.note) {
      return res.json({
        status: 'error',
        message: 'Fields note missing',
      });
    }
    if (!req.body._id) {
      return res.json({
        status: 'error',
        message: 'Fields id recette missing',
      });
    }

    // Récupère la recette par l'id
    const Recette = req.app.get('models').Recette;
    const idRecetteModify = req.body._id;
    const addNote = req.body.note;
    const RecetteUpdate = Recette.findByIdAndUpdate(
      idRecetteModify,
      { note: addNote },
      { upsert: false },
      (err) => {
        if (err) {
          return res.json({
            status: 'error',
            message: 'Recette not found or something like that',
          });
        }
      }
    );
    if (!RecetteUpdate) {
      return res.json({
        status: 'error',
        message: 'Add note failed',
      });
    }
    return res.json({
      status: 'ok',
      message: 'Add note ecette to success',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Catch error',
    });
  }
}

// Export des fonctions
module.exports = {
  recetteCreate,
  getRecettesWithToken,
  getRecettesWihoutToken,
  modifyRecette,
  removeRecette,
  addNote,
};

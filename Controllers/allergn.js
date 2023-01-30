/**
 * Crée un allergene
 * @param {*} req
 * @param {*} res
 * @returns response json
 */
async function allergnCreate(req, res) {
  try {
    if (req.role !== 2) {
      return res.json({
        status: 'error',
        message: 'Not authorized',
      });
    }
    if (!req.body.name) {
      return res.json({
        status: 'error',
        message: 'Name missing',
      });
    }

    const Allergn = req.app.get('models').Allergn;
    const NewAllergn = await new Allergn({
      name: req.body.name,
    }).save();

    if (NewAllergn) {
      return res.json({
        status: 'ok',
        message: 'Allergn create success',
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
 * Modifie un allergn
 * @param {*} req
 * @param {*} res
 * @returns json message
 */
async function modifyAllergn(req, res) {
  try {
    if (req.role !== 2) {
      return res.json({
        status: 'error',
        message: 'Not authorized',
      });
    }
    if (!req.body.modify.name) {
      return res.json({
        status: 'error',
        message: 'Name missing',
      });
    }
    if (!req.body._id) {
      return res.json({
        status: 'error',
        message: 'Fields id Allergn missing',
      });
    }

    // Récupère la Allergn par l'id
    const Allergn = req.app.get('models').Allergn;
    const idAllergnModify = req.body._id;
    const objetModify = req.body.modify;
    const AllergnUpdate = Allergn.findByIdAndUpdate(
      idAllergnModify,
      objetModify,
      { upsert: false },
      (err) => {
        if (err) {
          return res.json({
            status: 'error',
            message: 'Allergn not found or something like that',
          });
        }
      }
    );
    if (!AllergnUpdate) {
      return res.json({
        status: 'error',
        message: 'Allergn not found or something like that',
      });
    }
    return res.json({
      status: 'ok',
      message: 'Allergn modify to success',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Catch error',
    });
  }
}
/**
 * Supprime une allergene
 * @param {*} req
 * @param {*} res
 * @returns json message
 */
async function removeAllergn(req, res) {
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
    const Allergn = req.app.get('models').Allergn;
    const ToDeleteAllergn = await Allergn.findById(req.body._id);
    if (!ToDeleteAllergn) {
      return res.json({
        status: 'error',
        message: 'Allergn not found or something like that',
      });
    }
    await ToDeleteAllergn.remove().catch(() => {
      return res.json({
        status: 'error',
        message: 'Allergn found but error in delete',
      });
    });
    return res.json({
      status: 'ok',
      message: 'Allergn delete success',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Catch error',
    });
  }
}

/**
 * Recupère la liste de tout les Allergn
 * @param {*} req
 * @param {*} res
 * @returns json array d'object des Allergn
 */
async function getAllergns(req, res) {
  try {
    // Récupère l'intégralité des Allergn
    const Allergn = req.app.get('models').Allergn;
    const listAllergn = await Allergn.find({});
    return res.json({
      status: 'ok',
      message: 'List of Allergn',
      listAllergn: listAllergn,
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Catch error',
    });
  }
}

module.exports = {
  getAllergns,
  allergnCreate,
  modifyAllergn,
  removeAllergn,
};

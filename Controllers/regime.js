/**
 * Crée un regime
 * @param {*} req
 * @param {*} res
 * @returns response json
 */
async function regimeCreate(req, res) {
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

    const Regime = req.app.get('models').Regime;
    const NewRegime = await new Regime({
      name: req.body.name,
    }).save();

    if (NewRegime) {
      return res.json({
        status: 'ok',
        message: 'Regime create success',
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
 * Modifie un regime
 * @param {*} req
 * @param {*} res
 * @returns json message
 */
async function modifyRegime(req, res) {
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
        message: 'Fields id Regime missing',
      });
    }

    // Récupère la Regime par l'id
    const Regime = req.app.get('models').Regime;
    const idRegimeModify = req.body._id;
    const objetModify = req.body.modify;
    const RegimeUpdate = Regime.findByIdAndUpdate(
      idRegimeModify,
      objetModify,
      { upsert: false },
      (err) => {
        if (err) {
          return res.json({
            status: 'error',
            message: 'Regime not found or something like that',
          });
        }
      }
    );
    if (!RegimeUpdate) {
      return res.json({
        status: 'error',
        message: 'Regime not found or something like that',
      });
    }
    return res.json({
      status: 'ok',
      message: 'Regime modify to success',
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
async function removeRegime(req, res) {
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
    const Regime = req.app.get('models').Regime;
    const ToDeleteRegime = await Regime.findById(req.body._id);
    if (!ToDeleteRegime) {
      return res.json({
        status: 'error',
        message: 'Regime not found or something like that',
      });
    }
    await ToDeleteRegime.remove().catch(() => {
      return res.json({
        status: 'error',
        message: 'Regime found but error in delete',
      });
    });
    return res.json({
      status: 'ok',
      message: 'Regime delete success',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Catch error',
    });
  }
}

/**
 * Recupère la liste de tout les Regime
 * @param {*} req
 * @param {*} res
 * @returns json array d'object des Regime
 */
async function getRegimes(req, res) {
  try {
    // Récupère l'intégralité des Regime
    const Regime = req.app.get('models').Regime;
    const listRegime = await Regime.find({});
    return res.json({
      status: 'ok',
      message: 'List of Regime',
      listRegime: listRegime,
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Catch error',
    });
  }
}

module.exports = {
  getRegimes,
  regimeCreate,
  modifyRegime,
  removeRegime,
};

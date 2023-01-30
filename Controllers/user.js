const encryptPassword = require('../utils/encryptPassword');
const decryptPassword = require('../utils/decryptPassword');

/**
 * Crée l'utilsateur avec les elements dans req.body
 * @param {*} req
 * @param {*} res
 * @returns le json du nouvelle utilisateur
 */
async function userCreate(req, res) {
  try {
    if (!req.body.password) {
      return res.json({
        status: 'error',
        message: 'Missing password',
      });
    }
    if (req.role !== 2) {
      return res.json({
        status: 'error',
        message: 'Not authorized',
      });
    }

    const { token, salt, hash } = encryptPassword(req.body.password);

    const User = req.app.get('models').User;

    const NewUser = await new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      token,
      salt,
      hash,
      allergn: req.body.allergn,
      regime: req.body.regime,
      role: 1,
    }).save();

    if (NewUser) {
      return res.json({
        status: 'ok',
        message: 'User create success',
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
 * Recupère la liste de tout les utilisteurs
 * @param {*} req
 * @param {*} res
 * @returns json array d'object des utilisateur
 */
async function getUsers(req, res) {
  try {
    if (req.role !== 2) {
      return res.json({
        status: 'error',
        message: 'Not authorized',
      });
    }
    // Récupère l'intégralité des utilisateurs
    const User = req.app.get('models').User;
    const listUser = await User.find({});
    return res.json({
      status: 'ok',
      message: 'List of users',
      listUser: listUser,
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Catch error',
    });
  }
}

/**
 * Effectue la connexion de l'utilisateur
 * @param {*} req
 * @param {*} res
 * @returns json object avec le token
 */
async function userLogin(req, res) {
  try {
    if (!req.body.email || !req.body.password) {
      return res.json({
        status: 'error',
        message: 'Missing fields',
      });
    }
    // Vérifie l'existance de l'utilisateur
    const User = req.app.get('models').User;
    const userExisting = await User.exists({ email: req.body.email });
    if (!userExisting) {
      return res.json({
        status: 'error',
        message: 'Not found this user',
      });
    }

    // Vérifier si l'user correspond
    const toVerifyUser = await User.findById(userExisting._id);
    if (!toVerifyUser || toVerifyUser.email !== req.body.email) {
      return res.json({
        status: 'error',
        message: 'Not found this user',
      });
    }
    // Recupère le token de utilisateur
    const token = decryptPassword(toVerifyUser, req.body.password);
    const role = toVerifyUser.role === 2 ? 'admin' : 'client';
    if (!decryptPassword(toVerifyUser, req.body.password)) {
      return res.json({
        status: 'error',
        message: 'Your password is incorrect',
      });
    }
    return res.json({
      status: 'ok',
      token: token,
      role: role,
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Catch error',
    });
  }
}

/**
 * Modifie l'utilisteur
 * @param {*} req
 * @param {*} res
 * @returns json message
 */
async function modifyUser(req, res) {
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
        message: 'Fields id user missing',
      });
    }

    // Récupère l'user par l'id
    const User = req.app.get('models').User;
    const idUserModify = req.body._id;
    const objetModify = req.body.modify;
    const userUpdate = User.findByIdAndUpdate(
      idUserModify,
      objetModify,
      { upsert: false },
      (err) => {
        if (err) {
          return res.json({
            status: 'error',
            message: 'User not found or something like that',
          });
        }
      }
    );
    if (!userUpdate) {
      return res.json({
        status: 'error',
        message: 'User not found or something like that',
      });
    }
    return res.json({
      status: 'ok',
      message: 'User modify to success',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Catch error',
    });
  }
}

/**
 * Supprime l'utilisteur
 * @param {*} req
 * @param {*} res
 * @returns json message
 */
async function removeUser(req, res) {
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
    console.log(req.body._id);
    // Récupère l'user par l'id
    const User = req.app.get('models').User;
    const ToDeleteUser = await User.findById(req.body._id);
    if (!ToDeleteUser) {
      return res.json({
        status: 'error',
        message: 'User not found or something like that',
      });
    }
    await ToDeleteUser.remove().catch(() => {
      return res.json({
        status: 'error',
        message: 'User found but error in delete',
      });
    });
    return res.json({
      status: 'ok',
      message: 'User delete success',
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
  userCreate,
  getUsers,
  userLogin,
  modifyUser,
  removeUser,
};

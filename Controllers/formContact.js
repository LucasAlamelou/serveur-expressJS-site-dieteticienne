/**
 * Crée une message de contact avec les elements dans req.body
 * @param {*} req
 * @param {*} res
 * @returns response json
 */
async function formContactCreate(req, res) {
  try {
    const FormCreate = req.app.get('models').FormContact;
    const NewContact = await new FormCreate({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
    }).save();
    if (NewContact) {
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

module.exports = { formContactCreate };

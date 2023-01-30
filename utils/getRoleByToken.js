async function getRoleByToken(req, res, next) {
  if (!req.parms) {
    req.role = 'unauthentificated';
    return next();
  }
  const User = req.app.get('models').User;
  const toCheckUser = await User.findOne({ token: req.parms.token });
  if (!toCheckUser) {
    req.role = 'unauthentificated';
    return next();
  }
  req.role = toCheckUser.role;
  return next();
}
module.exports = getRoleByToken;

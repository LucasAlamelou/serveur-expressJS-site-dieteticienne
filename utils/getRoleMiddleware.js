async function getRoleMiddleware(req, res, next) {
  if (!req.body.token) {
    req.role = 'unauthentificated';
    return next();
  }
  const User = req.app.get('models').User;
  const toCheckUser = await User.findOne({ token: req.body.token });

  if (!toCheckUser) {
    req.role = 'unauthentificated';
    return next();
  }
  req.role = toCheckUser.role;
  return next();
}

module.exports = getRoleMiddleware;

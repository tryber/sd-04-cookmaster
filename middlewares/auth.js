const userModel = require('../models/user');

const SESSIONS = {};

const getUser = async (req) => {
  const { token = '' } = req.cookies || {};
  if (!token) return null;

  const userId = SESSIONS[token];
  if (!userId) return null;

  const user = await userModel.userById(userId);
  if (!user) return null;

  return user[0];
};

const authMiddleware = (required = true) => async (req, res, next) => {
  const user = await getUser(req);

  if (!user && required) return res.redirect(`/login?redirect=${encodeURIComponent(req.url)}`);

  if (!user && !required) return next();

  // const { password, ...userData } = user;0

  req.user = user;

  return next();
};

module.exports = {
  SESSIONS,
  authMiddleware,
};

const userModel = require('../models/userModel');

const SESSIONS = {};

const getUser = async (req) => {
  const { token = '' } = req.cookies || {};
  if (!token) return null;

  const userId = SESSIONS[token];
  if (!userId) return null;

  const user = await userModel.findById(userId);
  if (!user) return null;

  return user;
};

const authMiddleware = (required = true) => async (req, res, next) => {
  const user = await getUser(req);
  console.log("auth linha20", req.body);

  if (!user && required)
    return res.redirect(`/login?redirect=${encodeURIComponent(req.url)}`);

  if (!user && !required) return next();

  const { password, ...userData } = user; // tirou a senha por ser dados pessoal

  req.user = userData;
  console.log("linha 30", req.user);

  return next();
};

module.exports = {
  SESSIONS,
  authMiddleware,
};

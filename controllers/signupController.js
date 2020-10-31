const signupModel = require('../models/signupModel');

const signup = (_req, res) => {
  res.render('admin/signup');
};

const createNewUser = async (req, res) => {
  await signupModel.createUser({ ...req.body })
  return res.redirect('/login')
}

module.exports = {
  signup,
  createNewUser,
}
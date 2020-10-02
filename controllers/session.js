const userModel = require('../models/user');

const signupForm = (_req, res) => res.render('signup');

const signup = (req, res) => {
  const userData = req.body;
};

module.exports = {
  signupForm,
  signup,
};

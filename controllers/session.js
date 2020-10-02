const userModel = require('../models/user');

const signupForm = (_req, res) => res.render('signup');

const signup = (req, res) => {
  const { name } = req.body;
  console.log(name);
};

module.exports = {
  signupForm,
  signup,
};

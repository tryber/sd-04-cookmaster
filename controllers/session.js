const userModel = require('../models/user');

const signupForm = (_req, res) => res.render('signup', { messages: null });

const signup = (req, res) => {
  const userData = req.body;
};

module.exports = {
  signupForm,
  signup,
};

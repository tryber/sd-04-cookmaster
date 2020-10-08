const { registerUser } = require('../models/registerModel');

const registerForm = async (_, res) => {
  res.render('admin/register', { message: null });
};

const register = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  console.log(req.body);
};

module.exports = {
  registerForm,
  register,
};

const UserModel = require('../models/userModel');

const newUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!UserModel.isValidEmail(email)) return res.status(402).json({ data: 'Dados errados' });

  await UserModel.addUser(email, password, firstName, lastName);
  return res.render('register', { email, password, firstName, lastName });
};

module.exports = { newUser };

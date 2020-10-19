const { validationsForms } = require('../models/validationsForms');
const userModel = require('../models/userModel');

const signUp = (_, res) => {
  res.render('register', { message: null });
};

const newUser = async (req, res) => {
  const validation = await validationsForms({ ...req.body });
  if (validation) return res.render('register', { ...validation });
   // await userModel.createNewUser({ ...req.body });
};

module.exports = {
  signUp,
  newUser,
};

const userModel = require('../models/userModel');
const { validationsForms } = require('../models/validationsForms');

const signUp = (_, res) => {
  res.render('register', { message: null });
};

const newUser = async (req, res) => {
  const validation = await validationsForms({ ...req.body });
  if (validation) {
    await userModel.createNewUser({ ...req.body });
    return res.render('register', { ...validation });
  }
  return null;
};

module.exports = {
  signUp,
  newUser,
};

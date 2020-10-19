const { validationsForms } = require('../models/validationsForms');
const userModel = require('../models/userModel');

const signUp = (_, res) => {
  res.render('register', { message: null });
};

async function newUser(req, res) {
  const validation = await validationsForms({ ...req.body });
  if (validation) {
    await userModel.createNewUser({ ...req.body });
    return res.render('register', { ...validation });
  }
  return;
}

module.exports = {
  signUp,
  newUser,
};

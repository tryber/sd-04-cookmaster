const { validationsForms } = require('../models/validationsForms');

const signUp = (_, res) => {
  res.render('register', { message: null });
};

const newUser = async (req, res) => {
  const validation = await validationsForms({ ...req.body });
  if (validation) return res.render('register', { ...validation });
};

module.exports = {
  signUp,
  newUser,
};

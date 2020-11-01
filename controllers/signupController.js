const signupModel = require('../models/signupModel');
const { validator } = require('../models/signupModel');

const signup = (_req, res) => {
  res.render('admin/signup', { message: null });
};

const createNewUser = async (req, res) => {
  const isValid = await validator({ ...req.body });
  if (isValid !== { message: 'Cadastro efetuado com sucesso!' }) {
    return res.status(400).render('admin/signup', { ...isValid });
  }
  await signupModel.createUser({ ...req.body });
  return res.redirect('/login');
};

module.exports = {
  signup,
  createNewUser,
};

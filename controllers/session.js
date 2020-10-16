const userModel = require('../models/user');

const signupForm = (_req, res) => res.render('signup', { messages: null });

const signup = async (req, res) => {
  const userData = req.body;

  const result = await userModel.create(userData);

  return (result.getAffectedItemsCount() > 0)
    ? res.render('signup', { messages: ['Cadastro efetuado com sucesso!'] })
    : res.render('signup', { messages: 'Ocorreu um erro ao efetuar o cadastro' });
};

module.exports = {
  signupForm,
  signup,
};

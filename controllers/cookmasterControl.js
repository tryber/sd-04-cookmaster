const recipesModels = require('../models/recipesModels');
const { validation } = require('../services/isValid');

const index = async (req, res) => {
  const recipes = await recipesModels.getAllRecipes();

  res.render('home', { recipes, user: req.user });
};

const cadastroForm = async (req, res) =>
  res.render('cadastro', {
    messageEmail: null,
    messagePass: null,
    messagePassAgain: null,
    messageNome: null,
    messageSobrenome: null,
    messageSucess: null,
  });

const cadastro = async (req, res, redirect) => {
  const isValid = await validation({ ...req.body });
  // console.log({ ...req.body });

  console.log(isValid);
  if (isValid.status === 'ok') {
    res.render('cadastro', { messageSucess: isValid.messageSucess });
  } else {
    res.render('cadastro', {
      messageEmail: isValid.messageEmail,
      messagePass: isValid.messagePass,
      messagePassAgain: isValid.messagePassAgain,
      messageNome: isValid.messageNome,
      messageSobrenome: isValid.messageSobrenome,
    });
  }
};

module.exports = {
  index,
  cadastro,
  cadastroForm,
};

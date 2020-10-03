const userModel = require('../models/userModel');

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
  if (!regexEmail.test(email)) {
    return res.render('signup', { message: 'O email deve ter o formato email@mail.com' });
  }

  return next();
};

const checkPassword = async (req, res, next) => {
  const { password } = req.body;
  if (password[0].length < 6) {
    return res.render('signup', { message: 'A senha deve ter pelo menos 6 caracteres' });
  }

  return next();
};

const checkConfirmPassword = async (req, res, next) => {
  const { password } = req.body;
  if (password[0] !== password[1]) {
    return res.render('signup', { message: 'As senhas tem que ser iguais' });
  }

  return next();
};

const checkFirstName = async (req, res, next) => {
  const { firstName } = req.body;
  const regexName = /^[a-z]+$/i;
  if (!regexName.test(firstName) || firstName.length < 3) {
    return res.render('signup', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });
  }

  return next();
};

const checkLastName = async (req, res, next) => {
  const { lastName } = req.body;
  const regexName = /^[a-z]+$/i;
  if (!regexName.test(lastName) || lastName.length < 3) {
    return res.render('signup', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });
  }
  return next();
};

const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  await userModel.newUser(email, password, firstName, lastName);
  return res.render('signup', { message: 'Cadastro efetuado com sucesso!' });
};

module.exports = {
  checkEmail,
  checkPassword,
  checkConfirmPassword,
  checkFirstName,
  checkLastName,
  signup,
};

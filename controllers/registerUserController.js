const userModel = require('../models/userModel');
const registerUserModel = require('../models/registerUserModel');

const registerForm = (_req, res) =>
  res.render('register', { message: null });

const verifyEmpty = (req, res, next) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  if (!email || !password || !confirmPassword || !firstName || !lastName) {
    return res.render('register', { message: 'Preencha todos os campos' });
  }
  return next();
};

const verifyEmail = (req, res, next) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const { email } = req.body;
  const testRegex = emailRegex.test(email);
  if (!testRegex) {
    return res.render('register', { message: 'O email deve ter o formato email@mail.com' });
  }
  return next();
};

const verifyExistEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findByEmail(email);
  if (user) {
    return res.render('register', { message: 'Esse email já está cadastrado' });
  }
  return next();
};

const verifyPasswordLength = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.render('register', { message: 'A senha deve ter pelo menos 6 caracteres' });
  }
  return next();
};

const verifyPasswordEqual = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.render('register', { message: 'As senhas tem que ser iguais' });
  }
  return next();
};

const numberInStringRegex = /[0-9]/;

const verifyFirstName = (req, res, next) => {
  const { firstName } = req.body;
  if (numberInStringRegex.test(firstName) || firstName.length < 3) {
    return res.render('register', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras'
    });
  }
  return next();
};

const verifyLastsName = (req, res, next) => {
  const { lastName } = req.body;
  if (numberInStringRegex.test(lastName) || lastName.length < 3) {
    return res.render('register', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras'
    });
  }
  return next();
};

const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  registerUserModel(email, password, firstName, lastName)
    .then(() => res.render('register', { message: 'Cadastro efetuado com sucesso!' }));
};

module.exports = {
  registerForm,
  verifyEmpty,
  verifyEmail,
  verifyExistEmail,
  verifyPasswordLength,
  verifyPasswordEqual,
  verifyFirstName,
  verifyLastsName,
  register,
};

const userModel = require('../models/userModel');

const message = {
  email: 'O email deve ter o formato email@mail.com',
  password: 'A senha deve ter pelo menos 6 caracteres',
  confirmPassword: 'As senhas tem que ser iguais',
  firstName: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  lastName: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
};

const validationMessage = (validationBool, type) => (validationBool ? null : message[type]);

const validation = (req, res, next) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  const { validateEmail, validatePassword, confirmPass, validateName } = userModel;

  if (
    validateEmail(email) &&
    validatePassword(password) &&
    confirmPass(password, confirmPassword) &&
    validateName(firstName) &&
    validateName(lastName)
  ) {
    req.validated = true;
  } else {
    req.validated = false;
  }

  req.messages = {
    email: validationMessage(validateEmail(email), 'email'),
    password: validationMessage(validatePassword(password), 'password'),
    confirmPassword: validationMessage(confirmPass(password, confirmPassword), 'confirmPassword'),
    firstName: validationMessage(validateName(firstName), 'firstName'),
    lastName: validationMessage(validateName(lastName), 'lastName'),
  };

  return next();
};

module.exports = validation;

const { createNewUser } = require('../models/userModel');

const signUpForm = async (req, res) => {
  res.render('admin/userSignup', { message: '' });
};

const checkNameReturnMessage = (name, lastName) => {
  const numberPattern = /\d/;
  let message;
  if (name.length < 3 || numberPattern.test(name)) {
    message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  if (lastName.length < 3 || numberPattern.test(lastName)) {
    message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  return message;
};

const checkAndReturnMessage = (email, password, passwordConf, name, lastName) => {
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let message = 'Cadastro efetuado com sucesso!';
  const nameMessage = checkNameReturnMessage(name, lastName);
  if (!emailPattern.test(email)) {
    message = 'O email deve ter o formato email@mail.com';
  }
  if (password !== passwordConf) {
    message = 'As senhas tem que ser iguais';
  }
  if (password.length < 6) {
    message = 'A senha deve ter pelo menos 6 caracteres';
  }
  if (checkNameReturnMessage(name, lastName)) {
    message = nameMessage;
  }
  return message;
};

const signUp = async (req, res) => {
  const { email, password, passwordConf, name, lastName } = req.body;

  const message = checkAndReturnMessage(email, password, passwordConf, name, lastName);

  createNewUser({
    email,
    password,
    name,
    lastName,
  });
  return res.render('admin/userSignup', { message });
};

module.exports = {
  signUpForm,
  signUp,
};

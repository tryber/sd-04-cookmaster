const { createNewUser } = require('../models/userModel');

const signUpForm = async (_req, res) => {
  res.render('admin/signUp', { message: '' });
};

const messageName = (name, lastName) => {
  const namePattern = /\d/;
  let message;
  if (name.length < 3 || namePattern.test(name)) {
    message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  if (lastName.length < 3 || namePattern.test(lastName)) {
    message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  return message;
};

const messageEmail = (email) => {
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  let message = 'Cadastro efetuado com sucesso!';
  if (!emailPattern.test(email)) {
    message = 'O email deve ter o formato email@mail.com';
  }
  return message;
}

const messagePassword = (password, passwordConf) => {
  let message = 'Cadastro efetuado com sucesso';
  if (password !== passwordConf) {
    message = 'As senhas tem que ser iguais';
  }
  if (password.length < 6) {
    message = 'A senha deve ter pelo menos 6 caracteres';
  }
  return message;
};

const messages = (email, password, passwordConf, name, lastName) => {
  if (messageName(name, lastName)) {
    message = messageName;
  }
  if (messageEmail(email)) {
    message = messageEmail
  }
  if ((messagePassword = (password, passwordConf))) {
    message = messagePassword
  }
  return message;
};

const signUp = async (req, _res) => {
  const { email, password, passwordConf, name, lastName } = req.body;

  const message = messages(email, password, passwordConf, name, lastName);

  createNewUser({
    email,
    password,
    name,
    lastName,
  });
  return res.render('admin/signUp', { message });
};

module.exports = {
  signUpForm,
  signUp,
};

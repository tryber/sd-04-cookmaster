const { createNewUser } = require('../models/userModel');

const signUpForm = async (_req, res) => {
  res.render('admin/signUp', {message: ''});
};

const messageNameCheck = (name, lastName) => {
  const namePattern = /\d/;

  let message = '';

  if (name.length < 3 || namePattern.test(name)) {
    message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  if (lastName.length < 3 || namePattern.test(lastName)) {
    message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  return message;
};

const messagesAllCheck = (email, password, confPassword, name, lastName) => {
  // tirado do https://emailregex.com/
  // the regex used in type=”email” from W3C
  const nameMessage = messageNameCheck(name, lastName);
  const emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  let message = 'Cadastro efetuado com sucesso!';

  if (!emailPattern.test(email)) {
    message = 'O email deve ter o formato email@mail.com';
  }
  if (password.length < 6) {
    message = 'A senha deve ter pelo menos 6 caracteres';
  }
  if (password !== confPassword) {
    message = 'As senhas tem que ser iguais';
  }
  if (messageNameCheck(name, lastName)) {
    message = nameMessage;
  }
  return message;
};

const signUp = async (req, res) => {
  const { email, password, confPassword, name, lastName } = req.body;

  const message = messagesAllCheck(email, password, confPassword, name, lastName);

  await createNewUser({
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

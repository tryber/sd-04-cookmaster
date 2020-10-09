const newUser = require('../models/userModel');

let message = '';

const cadastroForm = (req, res) => {
  res.render('cadastro', { message: null, redirect: null });
};

const validateEmail = (email) => {
  if (!email.includes('@') || !email.includes('.')) {
    return (message = 'O email deve ter o formato email@mail.com');
  }
  return null;
};

const validatePassword = (password, passconfirm) => {
  if (password.length < 6) {
    return (message = 'A senha deve ter pelo menos 6 caracteres');
  }
  if (password !== passconfirm) {
    return (message = 'As senhas tem que ser iguais');
  }
  return null;
};

const validateNome = (name, lastName) => {
  if (typeof name !== 'string' || name.length <= 3) {
    return (message =
      'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  }
  if (typeof lastName !== 'string' || lastName.length <= 3) {
    return (message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  }
  return null;
};

const signup = async (req, res) => {
  const { email, password, passconfirm, name, lastName } = req.body;
  if (
    validateEmail(email) ||
    validatePassword(password, passconfirm) ||
    validateNome(name, lastName)
  ) {
    return res.render('cadastro', { message });
  }
  newUser.createUser(email, password, name, lastName);
  message = 'Cadastro efetuado com sucesso!';
  return res.render('cadastro', { message });
};

module.exports = {
  cadastroForm,
  signup,
};

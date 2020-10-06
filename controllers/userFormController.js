const userModel = require('../models/userModel');

const validateName = (name) => {
  if (!userModel.isUserNameValid(name)) {
    return 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
};

const validateLastName = (lastName) => {
  if (!userModel.isUserNameValid(lastName)) {
    return 'O email deve ter o formato email@mail.com';
  }
};

const validadeEmail = (email) => {
  if (!userModel.isEmailValid(email)) {
    return 'O email deve ter o formato email@mail.com';
  }
};

const validatePassword = (password) => {
  userModel.isPasswordValid(password) ? null : 'A senha deve ter pelo menos 6 caracteres';
};

const validateConfirmPassword = (password, cPassword) => {
  if (!userModel.isCounterPasswordValid(password, cPassword)) {
    return 'As senhas tem que ser iguais';
  }
};

const userForm = async (_req, res) => {
  res.render('cadastro', { message: null });
};

const newUser = async (req, res) => {
  const user = req.body;

  const isName = validateName(user.firstName);
  const isLastName = validateLastName(user.lastName);
  const isEmail = validadeEmail(user.email);
  const isPassword = validatePassword(user.password);
  const isConfirmPassword = validateConfirmPassword(user.password, user.confirmPassword);

  if (isName || isLastName || isEmail || isPassword || isConfirmPassword) {
    res
      .status(402)
      .render('cadastro', {
        message: { isName, isLastName, isEmail, isPassword, isConfirmPassword },
      });
  }

  await userModel.createUser(user);

  res.render('cadastro', { message: 'Cadastro efetuado com sucesso!' });
};

module.exports = {
  newUser,
  userForm,
};

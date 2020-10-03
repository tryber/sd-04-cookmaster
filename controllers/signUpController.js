const userModel = require('../models/userModel');

const renderSignup = async (_req, res) => {
  res.render('admin/signUp', {
    emailMessage: null,
    passMessage: null,
    confirmPass: null,
    firstNamemessage: null,
    lastNameMessage: null,
    successMessage: null,
  });
};

const handleEmailMessage = (email) => {
  if (!userModel.emailIsValid(email)) {
    return 'O email deve ter o formato email@mail.com';
  }
  return null;
};

const handlePassMessage = (password) => {
  if (!userModel.passwordIsValid(password)) {
    return 'A senha deve ter pelo menos 6 caracteres';
  }
  return null;
};

const handleConfirmPass = (password, confirmPass) => {
  if (!userModel.confirmPass(password, confirmPass)) {
    return 'As senhas tem que ser iguais"';
  }
  return null;
};

const handleFirstNameMessage = (firstName) => {
  if (!userModel.nameIsValid(firstName)) {
    return 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  return null;
};

const handleLastNameMessage = (lastName) => {
  if (!userModel.nameIsValid(lastName)) {
    return 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  return null;
};

const newUser = async (req, res) => {
  const { email, password, confirmPass, firstName, lastName } = req.body;

  const emailMessage = handleEmailMessage(email);
  const passMessage = handlePassMessage(password);
  const confirmPass = handleConfirmPass(password, confirmPassword);
  const firstNamemessage = handleFirstNameMessage(firstName);
  const lastNameMessage = handleLastNameMessage(lastName);

  if (emailMessage || passMessage || confirmPass || firstNamemessage || lastNameMessage) {
    res.status(402).render('admin/signUp', {
      emailMessage,
      passMessage,
      confirmPass,
      firstNamemessage,
      lastNameMessage,
      successMessage: null,
    });
  }

  await userModel.addUser(email, password, firstName, lastName);

  res.status(201).render('admin/signUp', {
    emailMessage,
    passMessage,
    confirmPass,
    firstNamemessage,
    lastNameMessage,
    successMessage: 'Cadastro efetuado com sucesso!',
  });
};

module.exports = {
  renderSignup,
  newUser,
};

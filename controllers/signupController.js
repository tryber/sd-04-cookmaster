const userModel = require('../models/userModel');

exports.renderSignup = async (_req, res) => {
  res.render('admin/signup', {
    emailMessage: null,
    passMessage: null,
    confirmPassMessage: null,
    firstNameMessage: null,
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
    return 'As senhas tem que ser iguais';
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

exports.newUser = async (req, res) => {
  const { email, password, confirmPass, firstName, lastName } = req.body;

  const emailMessage = handleEmailMessage(email);
  const passMessage = handlePassMessage(password);
  const confirmPassMessage = handleConfirmPass(password, confirmPass);
  const firstNameMessage = handleFirstNameMessage(firstName);
  const lastNameMessage = handleLastNameMessage(lastName);

  if (emailMessage || passMessage || confirmPassMessage || firstNameMessage || lastNameMessage) {
    res.status(402).render('admin/signup', {
      emailMessage,
      passMessage,
      confirmPassMessage,
      firstNameMessage,
      lastNameMessage,
      successMessage: null,
    });
  }

  await userModel.addUser(email, password, firstName, lastName);

  res.status(201).render('admin/signup', {
    emailMessage,
    passMessage,
    confirmPassMessage,
    firstNameMessage,
    lastNameMessage,
    successMessage: 'Cadastro efetuado com sucesso!',
  });
};

exports.renderEditUser = async (req, res) => {
  const user = await userModel.findById(req.user.id);

  res.render('me/edit', {
    user,
    emailMessage: null,
    passMessage: null,
    confirmPassMessage: null,
    firstNameMessage: null,
    lastNameMessage: null,
  });
};

exports.editUser = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  const emailMessage = handleEmailMessage(email);
  const passMessage = handlePassMessage(password);
  const confirmPassMessage = handleConfirmPass(password, confirmPassword);
  const firstNameMessage = handleFirstNameMessage(firstName);
  const lastNameMessage = handleLastNameMessage(lastName);

  const user = await userModel.findById(req.user.id);
  if (emailMessage || passMessage || confirmPassMessage || firstNameMessage || lastNameMessage) {
    return res.status(402).render('me/edit', {
      user,
      emailMessage,
      passMessage,
      confirmPassMessage,
      firstNameMessage,
      lastNameMessage,
    });
  }

  await userModel.updateUser(req.user.id, email, password, firstName, lastName);
  return res.redirect('/');
};

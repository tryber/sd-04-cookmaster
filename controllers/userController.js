const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');

const loginForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('admin/login', {
    message: null,
    redirect: req.query.redirect,
  });
};

const login = async (req, res, next) => {
  const { email, password, redirect } = req.body;

  if (!email || !password) {
    return res.render('admin/login', {
      message: 'Preencha o email e a senha',
      redirect: null,
    });
  }

  const user = await userModel.findByEmail(email);
  if (!user || user.password !== password) {
    return res.render('admin/login', {
      message: 'Email ou senha incorretos',
      redirect: null,
    });
  }

  const token = uuid();
  SESSIONS[token] = user.id;

  res.cookie('token', token, { httpOnly: true, sameSite: true });
  res.redirect(redirect || '/');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

const renderSignup = (_req, res) => {
  res.render('admin/signup', { messages: null, done: false });
};

const signUp = async (req, res) => {
  if (!req.isValid) {
    return res.status(400).render('admin/signup', { messages: req.messages, done: false });
  }
  await userModel.addUser({ ...req.body });
  return res.status(200).render('admin/signup', { messages: req.messages, done: true });
};

const renderEditUser = async (req, res) => {
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

const editUser = async (req, res) => {
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

module.exports = {
  login,
  loginForm,
  logout,
  renderSignup,
  signUp,
  renderEditUser,
  editUser,
};

const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');
const validationsController = require('./signupValidationsController');

const loginForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('admin/login', {
    message: null,
    redirect: req.query.redirect,
  });
};

const login = async (req, res) => {
  const { email, password, redirect } = req.body;

  if (!email || !password)
    return res.render('admin/login', {
      message: 'Preencha o email e a senha',
      redirect: null,
    });

  const user = await userModel.findByEmail(email);
  if (!user || user.password !== password)
    return res.render('admin/login', {
      message: 'Email ou senha incorretos',
      redirect: null,
    });

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

const signupForm = (_req, res) =>
  res.render('signup', { message: null });

const signup = async (req, res) => {
  const { email, password, passwordCheck, firstName, lastName } = req.body;

  const emailValidation = validationsController.emailValidation(email);
  const passwordValidation = validationsController.passwordValidation(password, passwordCheck);
  const nameValidation = validationsController.nameValidation(firstName, lastName);

  if (emailValidation !== '')
    return res.render('signup', { message: emailValidation });

  if (passwordValidation !== '')
    return res.render('signup', { message: passwordValidation });

  if (nameValidation !== '')
    return res.render('signup', { message: nameValidation });

  const user = await userModel.registerNewUser(email, password, firstName, lastName);

  if (!user) res.status(500).render('signup', { message: 'Ocorreu um erro, tente novamente' });
  res.status(201).render('signup', { message: 'Cadastro efetuado com sucesso!' });
};

const updateUserForm = async (req, res) => {
  const userData = await userModel.findById(req.user.id);

  return res.render('admin/updateUser', { userData, message: null, user: req.user });
};

const updateUser = async (req, res) => {
  const { email, password, passwordCheck, firstName, lastName } = req.body;

  const emailValidation = validationsController.emailValidation(email);
  const passwordValidation = validationsController.passwordValidation(password, passwordCheck);
  const nameValidation = validationsController.nameValidation(firstName, lastName);

  if (emailValidation !== '')
    return res.render('admin/updateUser', { message: emailValidation });

  if (passwordValidation !== '')
    return res.render('admin/updateUser', { message: passwordValidation });

  if (nameValidation !== '')
    return res.render('admin/updateUser', { message: nameValidation });

  await userModel.updateUser(req.user.id, email, password, firstName, lastName);

  return res.redirect('/');
};

module.exports = {
  login,
  loginForm,
  logout,
  signupForm,
  signup,
  updateUserForm,
  updateUser,
};

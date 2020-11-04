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

const editForm = async (req, res) => {
  const userId = await userModel.findById(req.user.id);

  res.render('me/edit', { userId, messages: null });
};

const editUser = async (req, res) => {
  const { id } = req.user;
  const { email, password, firstName, lastName } = req.body;
  const user = { id, email, password, firstName, lastName };

  try {
    await userModel.updateUser(user);
  } catch (e) {
    res.status(500).send(e.message);
  }

  res.redirect('/');
};

module.exports = {
  login,
  loginForm,
  logout,
  renderSignup,
  signUp,
  editForm,
  editUser,
};

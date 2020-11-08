const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');
const { validationModel } = require('../models/validation');

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

const signUp = (_req, res) => {
  res.render('cadastro', { message: null });
};

const newUser = async (req, res) => {
  const valided = await validationModel({ ...req.body });
  if (valided !== 400) {
    return res.render('cadastro', { ...valided });
  }
  await userModel.createUser({ ...req.body });
  return res.render('cadastro', { message: 'cadastrado!' });
};

const newUse = async (req, res) => {
  const valided = await validationModel({ ...req.body });
  await userModel.createUser({ ...req.body });
  return res.render('cadastro', { message: 'cadastrado!' });
};

module.exports = {
  login,
  loginForm,
  logout,
  signUp,
  newUser,
};

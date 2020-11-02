const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');

const add = async (req, res) => {
  const {
    email, password, name, lastname,
  } = req.body;

  await userModel.add(email, password, name, lastname);
  return res.render('users/register', { error: false, success: true });
};

const addForm = (req, res) => res.render('users/register', { error: false, success: false });

const edit = async (req, res) => {
  const { id } = req.user;
  const {
    email, password, name, lastname,
  } = req.body;

  await userModel.update(id, email, password, name, lastname);
  return res.redirect('/');
};

const editForm = (req, res) => res.render('users/edit', { user: req.user, error: false, success: false });

const login = async (req, res) => {
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
  return res.redirect(redirect || '/');
};

const loginForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('admin/login', {
    message: null,
    redirect: req.query.redirect,
  });
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  return res.render('admin/logout');
};

module.exports = {
  add,
  addForm,
  edit,
  editForm,
  login,
  loginForm,
  logout,
};

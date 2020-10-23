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

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  return res.render('admin/logout');
};

const add = async (req, res) => {
  const {
    email, password, confirm, name, lastname,
  } = req.body;

  const emailPattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  if (!emailPattern.test(email)) res.render('users/register', { error: 'email', success: false });

  if (password.length < 6) res.render('users/register', { error: 'password', success: false });

  if (password !== confirm) res.render('users/register', { error: 'confirm', success: false });

  if (!/^[a-z]+$/i.test(name) || name.length < 3) {
    return res.render('users/register', { error: 'name', success: false });
  }

  if (!/^[a-z]+$/i.test(lastname) || lastname.length < 3) {
    return res.render('users/register', { error: 'lastname', success: false });
  }

  await userModel.add(email, password, name, lastname);
  return res.render('users/register', { error: false, success: true });
};

const edit = (req, res) => res.render('users/edit', { user: req.user });
const show = (req, res) => res.render('users/register', { error: false, success: false });

module.exports = {
  add,
  edit,
  login,
  loginForm,
  logout,
  show,
};

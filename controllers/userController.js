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

const register = (req, res) =>
  res.render('admin/register', { message: null });

const registerForm = async (req, res) => {
  const data = req.body;
  const message = await userModel.isValid(data);
  if (message.length === 0) {
    userModel.register(data);
    message.push('Cadastro efetuado com sucesso!');
  }
  return res.render('admin/register', { message });
};

const updateUserPage = async (req, res) => {
  res.render('admin/editUser', { user: req.user, message: null });
};

const updateUser = async (req, res) => {
  const data = req.body;
  const message = await userModel.isValid(data);
  if (message.length === 0) {
    userModel.updateUser(req.user.id, data);
    message.push('Cadastro salvo com sucesso!');
    return res.redirect('/');
  }
  return res.render('admin/editUser', { message, user: req.user });
};

module.exports = {
  login,
  loginForm,
  logout,
  register,
  registerForm,
  updateUserPage,
  updateUser,
};

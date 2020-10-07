const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const {
  insertUser, findByEmail, validateUser, updateUser,
} = require('../models/userModel');

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

  const user = await findByEmail(email);
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

const registerPage = (_req, res) => res.render('admin/registerUser', { message: {}, data: {} });

const registerNew = async ({ body }, res) => {
  const message = validateUser(body);
  if (message.confirmMsg) await insertUser(body);
  res.render('admin/registerUser', { message, data: message.confirmMsg ? {} : body });
};

const editPage = ({ userData }, res) => res.render('admin/editUser', { data: userData, message: {} });

const confirmEdit = ({ body, userData }, res) => {
  const message = validateUser(body);
  if (!message.confirmMsg) return res.render('admin/editUser', { message, data: userData });
  return updateUser(body, userData.id).then(() => res.redirect('/'));
};

module.exports = {
  login,
  loginForm,
  logout,
  registerPage,
  registerNew,
  editPage,
  confirmEdit,
};

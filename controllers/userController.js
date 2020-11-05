const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');
const { passwordValidation, regexValidation } = require('./signUpController');

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
  return res.redirect('/');
};

const updateUserPage = async (req, res) => {
  res.render('admin/editUser', { user: req.user, message: null });
};

const editUser = async (req, res) => {
  const {
    email, password, verifyPassword, name, lastName,
  } = req.body;
  let message = '';
  const messageOne = passwordValidation(password, verifyPassword);
  const messageTwo = regexValidation(email, name, lastName);
  if (messageOne.length === 0 && messageTwo.length === 0) {
    await userModel.userUpdate(req.user.id, name, lastName, password, email);
    message = 'Cadastro salvo com sucesso!';
    return res.redirect('/');
  }
  return res.render('admin/editUser', { message, user: req.user });
};

module.exports = {
  login,
  loginForm,
  logout,
  updateUserPage,
  editUser,
};

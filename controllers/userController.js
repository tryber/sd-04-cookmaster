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

const signUp = (_, res) => {
  res.render('signUp', { message: '' });
};

const create = async (req, res) => {
  const { name, password, passwordCheck, mail, lastname } = req.body;
  if (
    !userModel.isValidName(name, res) ||
    !userModel.isValidLastname(lastname, res) ||
    !userModel.isValidMail(mail, res) ||
    !userModel.isvalidPass(password, res) ||
    !userModel.isValidCheck(passwordCheck, res)
  )
    await userModel.addUser(name, lastname, mail, password);

  res.render('signUp', { message: 'Cadastro efetuado com sucesso!' });
  res.redirect('/login');
};

module.exports = {
  login,
  loginForm,
  logout,
  signUp,
  create,
};

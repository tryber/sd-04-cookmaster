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

const addUser = async (req, res) => {
  const user = req.body;
  const validName = userModel.isUserNameValid(user.firstName);
  const validEmail = userModel.isPasswordValid(user.password);

  const allValid = validName && validEmail;

  if (!validName) {
    return res.render('cadastro', { validName: 'errado' });
  }
  if (!validEmail) {
    return res.render('cadastro', { validName: 'errado' });
  }

  console.log(user);

  userModel.createUser(user);
  res.render('cadastro', { validName: 'Ola' });
};

module.exports = {
  login,
  loginForm,
  logout,
};

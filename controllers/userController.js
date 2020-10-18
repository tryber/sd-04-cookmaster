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
  res.redirect(redirect || '/admin');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

const userForm = (_, res) => res.status(200).render('userNew', { message: null });

const addUser = (req, res) => {
  const { email, password, cPassword, nome, sobrenome } = req.body;
  const user = { email, password, cPassword, nome, sobrenome };
  const message = userModel.validateUser(user);

  if (message === 'ok') {
    userModel.createUser(user);
    return res.status(200).render('userNew', { message: 'Cadastro efetuado com sucesso!' });
  }

  res.status(500).render('register', { message });
};

module.exports = {
  login,
  loginForm,
  logout,
  userForm,
  addUser,
};

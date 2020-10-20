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

const logout = async (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  return res.render('admin/logout');
};
const signupForm = (req, res) => res.render('admin/signup', { message: null, redirect: null });

const signup = async (req, res) => {
  const { name, lastname, email, password, agreePassword } = req.body;
  const user = await userModel.findByEmail(email);
  const resRender = (view, message, redirect) =>
    res.render(view, { message, redirect: redirect || null });

  const parseEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  if (parseEmail.test(user.email)) {
    return resRender('admin/signup', 'O email deve ter o formato email@mail.com');
  }

  if (user.email) {
    return resRender('admin/signup', 'Este email já foi cadastrado');
  }

  if (password.length < 6) {
    return resRender('admin/signup', 'A senha deve ter pelo menos 6 caracteres');
  }

  if (password !== agreePassword) {
    return resRender('admin/signup', 'As senhas tem que ser iguais');
  }

  userModel.addUser(name, lastname, email, password);
  return resRender('admin/signup', 'Cadastro efetuado com sucesso', 'admin/login');
};

module.exports = {
  login,
  loginForm,
  logout,
  signup,
  signupForm,
};

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
const emailValidation = (user) => {
  const parseEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  if (parseEmail.test(user.email)) {
    return 'O email deve ter o formato email@mail.com';
  } else if (user.email) {
    return 'Este email já foi cadastrado';
  }
  return null;
};
const passValidation = (password, agreePassword) => {
  if (password.length < 6) {
    return 'A senha deve ter pelo menos 6 caracteres';
  } else if (password !== agreePassword) {
    return 'As senhas tem que ser iguais';
  }
  return null;
};
const formValidation = (user, password, agreePassword) => {
  let message;
  const pass = passValidation(password, agreePassword);
  const email = emailValidation(user);

  if (pass) message = pass;
  if (email) message = email;

  return message;
};

const signup = async (req, res) => {
  const { name, lastname, email, password, agreePassword } = req.body;
  const user = await userModel.findByEmail(email);
  const resRender = (view, message, redirect) =>
    res.render(view, { message, redirect: redirect || null });

  let message = 'Cadastro efetuado com sucesso';
  message = formValidation(user, password, agreePassword);
  userModel.addUser(name, lastname, email, password);

  return resRender('admin/signup', message);
};

module.exports = {
  login,
  loginForm,
  logout,
  signup,
  signupForm,
};

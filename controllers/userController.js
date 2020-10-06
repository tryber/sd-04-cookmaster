const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');

const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const passwordRegex = /^(\d|\w){6,}$/;
const namesRegex = /\w{3,}/;

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

// cadastro user
const registerForm = (_req, res) => res.render('register', { message: null });

const register = async (req, res) => {
  const { email, password, passwordConfirm, name, lastName } = req.body;

  if (!emailRegex.test(email))
    return res.render('register', {
      message: 'O email deve ter o formato email@mail.com',
    });

  if (!passwordRegex.test(password))
    return res.render('register', {
      message: 'A senha deve ter pelo menos 6 caracteres',
    });

  if (password !== passwordConfirm)
    return res.render('register', {
      message: 'As senhas tem que ser iguais',
    });

  if (!namesRegex.test(name))
    return res.render('register', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });

  if (!namesRegex.test(lastName))
    return res.render('register', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });

  await userModel.registerUser({ ...req.body });

  return res.status(200).render('register', { message: 'Cadastro efetuado com sucesso!' });
};

module.exports = {
  login,
  loginForm,
  logout,
  registerForm,
  register,
};

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
  // return res.redirect(redirect || '/');
  res.redirect(redirect || '/admin');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

// Cadastro
const signup = async (req, res) => {
  const { email, password, repeatPassword, name, lastName } = req.body;
  // chama as validações
  const text = {
    email: userModel.isValidEmail(email),
    password: userModel.isValidPassword(password),
    repeatPassword: userModel.isValidRepeatPassword(password, repeatPassword),
    name: userModel.isValidName(
      name,
      'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    ),
    lastName: userModel.isValidName(
      lastName,
      'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    ),
    success: null,
  };

  if (Object.values(text).some((content) => content !== null)) {
    return res.render('signup', { message: text });
  }

  text.success = 'Cadastro efetuado com sucesso!';
  await userModel.add(email, password, repeatPassword, name, lastName);
  res.render('signup', { message: text });
};

module.exports = {
  login,
  loginForm,
  logout,
  signup,
};

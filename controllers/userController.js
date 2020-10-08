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

const signup = async (req, res) => {
  const { email, password, repeatPassword, name, lastName } = req.body;
  // chamar as validações
  /*
  let message;
  switch (email, password, repeatPassword, name, lastName) {
    case !userModel.isValidEmail(email):
      message = 'O email deve ter o formato email@mail.com';
      break;
  
    default:
      break;
  }
  */

  if (!userModel.isValidEmail(email)) {
    return res.render('signup', { message: 'O email deve ter o formato email@mail.com' });
  }
  if (!userModel.isValidPassword(password)) {
    return res.render('signup', { message: 'A senha deve ter pelo menos 6 caracteres' });
  }
  if (!userModel.isValidRepeatPassword(password, repeatPassword)) {
    return res.render('signup', { message: 'As senhas tem que ser iguais' });
  }
  if (!name || !userModel.isValidName(name)) {
    return res.render('signup', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });
  }
  if (!lastName || !userModel.isValidLastName(lastName)) {
    return res.render('signup', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });
  }

  await userModel.add(email, password, repeatPassword, name, lastName);
  res.render('signup', { message: 'Cadastro efetuado com sucesso!' });
  // res.redirect(redirect || '/login')
};

module.exports = {
  login,
  loginForm,
  logout,
  signup,
};

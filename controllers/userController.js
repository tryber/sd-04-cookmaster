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
  let text = {
    email: null,
    password: null,
    repeatPassword: null,
    name: null,
    lastName: null,
    success: null,
  };

  if (!userModel.isValidEmail(email)) {
    text.email = 'O email deve ter o formato email@mail.com';
    // return res.render('signup', { message: 'O email deve ter o formato email@mail.com' });
  }
  if (!userModel.isValidPassword(password)) {
    text.password = 'A senha deve ter pelo menos 6 caracteres';
    // return res.render('signup', { message: 'A senha deve ter pelo menos 6 caracteres' });
  }
  if (!userModel.isValidRepeatPassword(password, repeatPassword)) {
    text.repeatPassword = 'As senhas tem que ser iguais';
    // return res.render('signup', { message: 'As senhas tem que ser iguais' });
  }
  if (!userModel.isValidName(name)) {
    text.name = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
    // return res.render('signup', {
    //  message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    // });
  }
  if (!userModel.isValidName(lastName)) {
    text.lastName = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
    // return res.render('signup', {
    //  message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    // });
  }

  if (Object.values(text).some((text) => text !== null)) {
    return res.render('signup', { message: text });
  }
  text.success = 'Cadastro efetuado com sucesso!';
  await userModel.add(email, password, repeatPassword, name, lastName);
  res.render('signup', { message: text });
  // res.redirect(redirect || '/login')
};

module.exports = {
  login,
  loginForm,
  logout,
  signup,
};

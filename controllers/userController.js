const nodemon = require('nodemon');
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

  const userPromise = await userModel.findByEmail(email);
  const user = userPromise[0];
  if (!user || user.password !== password)
    return res.render('admin/login', {
      message: 'Email ou senha incorretos',
      redirect: null,
    });

  const token = uuid();
  SESSIONS[token] = user.id;
  res.cookie('token', token, { httpOnly: true, sameSite: true });
  // res.redirect(redirect || '/admin');
  res.redirect(redirect || '/');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

const registrationForm = async (req, res) => {
  const { email, password, passwordConfirmation, name, lastName } = req.body;
  // let messageErrorLogin = '';
  // let userDataError = 0;

  // if (!/([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/gim.test(email)) {
  //   userDataError = 1;
  //   messageErrorLogin = 'O email deve ter o formato email@mail.com';
  // }
  // if (password.length < 6) {
  //   userDataError = 1;
  //   messageErrorLogin = 'A senha deve ter pelo menos 6 caracteres';
  // }
  // if (password !== passwordConfirmation && password.length > 5) {
  //   userDataError = 1;
  //   messageErrorLogin = 'As senhas tem que ser iguais';
  // }
  // if (name.length < 3) {
  //   userDataError = 1;
  //   messageErrorLogin =
  //     'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  // }
  // if (lastName.length < 3) {
  //   userDataError = 1;
  //   messageErrorLogin =
  //     'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  // }
  // if (userDataError === 1) {
  //   return res.render('userRegistration', {
  //     message: messageErrorLogin,
  //   });
  // }

  const validationReturn = userModel.validationRegistrationData(
    email,
    password,
    passwordConfirmation,
    name,
    lastName,
  );
  if (validationReturn === 'ok') {
    await userModel.createUser(email, password, name, lastName);
    return res
      .status(201)
      .render('registeredSuccess', { message: 'Cadastro efetuado com sucesso!' });
  } else {
    return res.render('userRegistration', {
      message: validationReturn,
    });
  }
};

module.exports = {
  login,
  loginForm,
  logout,
  registrationForm,
};

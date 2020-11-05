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

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  return res.redirect('/');
};

const updateUserPage = async (req, res) => {
  res.render('admin/editUser', { user: req.user, message: null });
};

const passwordValidation = (password, verifyPassword) => {
  let message = '';

  if (password !== verifyPassword) message = 'As senhas tem que ser iguais';
  if (password.length < 6) message = 'A senha deve ter pelo menos 6 caracteres';

  return message;
};

const regexValidation = (email, name, lastname) => {
  let message = '';
  // Espressão regex consultada externamente (https://regex101.com/library/SOgUIV)
  const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
  const regexNumber = /[0-9]/;

  if (!regexEmail.test(email)) message = 'O email deve ter o formato email@mail.com';

  if (lastname.length < 3 || regexNumber.test(lastname)) {
    message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }

  if (regexNumber.test(name) || name.length < 3) {
    message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }

  return message;
};

const editUser = async (req, res) => {
  const {
    email, password, verifyPassword, name, lastName,
  } = req.body;
  let message = '';
  const messageOne = passwordValidation(password, verifyPassword);
  const messageTwo = regexValidation(email, name, lastName);
  if (messageOne.length === 0 && messageTwo.length === 0) {
    await userModel.userUpdate(req.user.id, name, lastName, password, email);
    message = 'Cadastro salvo com sucesso!';
    return res.redirect('/');
  }
  return res.render('admin/editUser', { message, user: req.user });
};

module.exports = {
  login,
  loginForm,
  logout,
  updateUserPage,
  editUser,
};

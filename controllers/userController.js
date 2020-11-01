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

const emailValidation = (email) => {
  const parseEmail = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+\.([a-zA-Z]+)?$/i;
  if (parseEmail.test(email) || !email) {
    return 'O email deve ter o formato email@mail.com';
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
const nameValidation = (name, lastname) => {
  if (name.length < 3) {
    return 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  } else if (lastname.length < 3) {
    return 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  return null;
};
const signup = async (req, res) => {
  const { name, lastname, email, password, agreePassword } = req.body;
  let message = 'Cadastro efetuado com sucesso!';
  const nameMessage = nameValidation(name, lastname);
  const emailMessage = emailValidation(email);
  const passMessage = passValidation(password, agreePassword);
  if (nameMessage) {
    message = nameMessage;
  } else if (emailMessage) {
    message = emailMessage;
  } else if (passMessage) {
    message = passMessage;
  }
  const warnings = await userModel.addUser(name, lastname, email, password);
  if (warnings > 0) {
    res.status(500).send('Erro de conexão com o banco de dados');
    message('Algo de errado aconteceu!');
  }
  return res.render('admin/signup', { message, redirect: null });
};

const editUserForm = async (req, res) => {
  const systemUser = req.user;
  const user = await userModel.findById(systemUser.id);
  return res.render('admin/edit', { user, message: null, redirect: null });
};

const editUser = async (req, res) => {
  const { name, lastname, email, password, agreePassword } = req.body;
  const user = req.user;
  let message = 'Cadastro efetuado com sucesso!';
  const nameMessage = nameValidation(name, lastname);
  const emailMessage = emailValidation(email);
  const passMessage = passValidation(password, agreePassword);
  if (nameMessage) {
    message = nameMessage;
  } else if (emailMessage) {
    message = emailMessage;
  } else if (passMessage) {
    message = passMessage;
  }
  const warnings = await userModel.updateUser(user.id, email, password, name, lastname);
  if (warnings > 0) {
    res.status(500).send('Erro de conexão com o banco de dados');
    message('Algo de errado aconteceu!');
  }
  res.redirect('/');
};

module.exports = {
  login,
  loginForm,
  logout,
  signup,
  signupForm,
  editUserForm,
  editUser,
};

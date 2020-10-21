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
  return res.render('admin/logout');
};

const add = async (req, res) => {
  const {
    email, password, confirm, name, lastname,
  } = req.body;

  const data = {
    error: null,
    success: false,
    message: [
      'O email deve ter o formato email@mail.com',
      'A senha deve ter pelo menos 6 caracteres',
      'As senhas tem que ser iguais',
      'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      'Cadastro efetuado com sucesso!',
    ],
  };

  const emailPattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  if (!emailPattern.test(email)) {
    data.error = 'email';
    return res.render('users/register', data);
  }

  if (password.length < 6) {
    data.error = 'password';
    return res.render('users/register', data);
  }

  if (password !== confirm) {
    data.error = 'confirm';
    return res.render('users/register', data);
  }

  if (!/^[a-z]+$/i.test(name) || name.length < 3) {
    data.error = 'name';
    return res.render('users/register', data);
  }

  if (!/^[a-z]+$/i.test(lastname) || lastname.length < 3) {
    data.error = 'lastname';
    return res.render('users/register', data);
  }

  data.success = true;
  await userModel.add(email, password, name, lastname);
  return res.render('users/register', data);
};

module.exports = {
  login,
  loginForm,
  logout,
  add,
};

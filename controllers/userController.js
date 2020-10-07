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
  res.redirect(redirect || '/');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

const createUser = async (req, res) => {
  const { email, password, confirmPass, name, lastName } = req.body;
  const valid = (email && password && confirmPass && name && lastName) && true;

  if (name.length < 3 || !(/^[A-Za-z]+$/.test(name))) {
    return res.render('cadastro', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      redirect: null,
    });
  }

  if (lastName.length < 3 || !(/^[A-Za-z]+$/.test(lastName))) {
    return res.render('cadastro', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      redirect: null,
    });
  }

  if (password.length < 6) {
    return res.render('cadastro', {
      message: 'A senha deve ter pelo menos 6 caracteres',
      redirect: null,
    });
  }

  if (password !== confirmPass) {
    return res.render('cadastro', {
      message: 'As senhas tem que ser iguais',
      redirect: null,
    });
  }

  if (!valid) {
    return res.render('cadastro', {
      message: 'Preencha todos campos!',
      redirect: null,
    });
  }

  if (!(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/.test(email))) {
    return res.render('cadastro', {
      message: 'O email deve ter o formato email@mail.com',
      redirect: null,
    });
  }

  await userModel.addUser(email, password, name, lastName);

  res.status(201).render('cadastro', {
    message: "Cadastro efetuado com sucesso!",
    redirect: null,
  });
};

module.exports = {
  login,
  loginForm,
  logout,
  createUser,
};

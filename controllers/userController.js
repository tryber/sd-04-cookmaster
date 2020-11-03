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
  // No arquivo controllers/userController.js modifique a linha *37* para redirecionar
  // para rota / no lugar de /admin. - FEITO
  return res.redirect(redirect || '/');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

// Cadastro de novo usuário
// Variáveis necessárias
// Deve ter o formato email@mail.com
const emailRegex = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
// Deve ter pelo menos 6 caracteres
const passwordRegex = /^(\d|\w){6,}$/;
// Devem ter no mínimo 3 caracteres sendo eles apenas letras, nome e sobrenome
const namesRegex = /\w{3,}/;

const registerUser = (_req, res) => res.render('register', { message: null });
const registerUserValid = async (req, res) => {
  const { email, password, senhaConfirm, name, lastName } = req.body;

  switch (true) {
    case !emailRegex.test(email):
      return res.render('register', {
        message: 'O email deve ter o formato email@mail.com'
      });
    case !passwordRegex.test(password):
      return res.render('register', {
        message: 'A senha deve ter pelo menos 6 caracteres'
      });
    case (password !== senhaConfirm):
      return res.render('register', {
        message: 'As senhas tem que ser iguais'
      });
    case (!namesRegex.test(name)):
      return res.render('register', {
        message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras'
      });
    case (!namesRegex.test(lastName)):
      return res.render('register', {
        message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras'
      });
    default:
      await userModel.registerModel({ ...req.body });
      return res.status(200).render('register', {
        message: 'Cadastro efetuado com sucesso!'
      });
  };

};

module.exports = {
  login,
  loginForm,
  logout,
  registerUser,
  registerUserValid,
};

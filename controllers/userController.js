const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');
const { validationModel } = require('../models/validationModel');

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

const signUp = (_, res) => {
  res.render('cadastro', { message: null });
};

/* CONTROLLER QUE É SOLICITADO APÓS O USUÁRIO ENVIAR O FORMS DE CADASTRO
CHAMA A FUNÇÃO NEWUSER PARA CRIAR UM NOVO USUÁRIO NO BANCO DE ACORDO COM O RESULTADO
DA FUNÇÃO DE VALIDAÇÃO */
const newUser = async (req, res) => {
  const isValid = await validationModel({ ...req.body });

  if (isValid) {
    await userModel.createUser({ ...req.body });
    return res.render('cadastro', { ...isValid });
  }
};

module.exports = {
  login,
  loginForm,
  logout,
  signUp,
  newUser,
};

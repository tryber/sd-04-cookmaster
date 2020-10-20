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

const cadastro = async (_req, res) => {
  res.render('admin/cadastro', {});
};

function isEmpty(object) {
  let message = '';
  Object.values(object).map((item) => {
    if (item) message = item;
  });
  return message;
}

const add = async (req, res) => {
  const { email, password, passwordConfirm, nome, sobrenome } = req.body;
  const validaEmail = userModel.validaEmail(email);
  const validaPassword = userModel.validaSenha(password, passwordConfirm);
  const validaNome = userModel.validaNome(nome);
  const validaSobrenome = userModel.validaSobrenome(sobrenome);
  const data = { validaEmail, validaPassword, validaNome, validaSobrenome };

  if (isEmpty(data)) res.send(isEmpty(data));
  else {
    return userModel
      .createUser(email, password, nome, sobrenome)
      .then(() => res.send('Cadastro efetuado com sucesso!'));
  }
};

module.exports = {
  add,
  cadastro,
  login,
  loginForm,
  logout,
};

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
  return res.redirect(redirect || '/admin');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

// Funções criadas

const validEmail = (email) => {
  let message = '';
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(email)) message = 'O email deve ter o formato email@mail.com';
  return message;
};

const validPassword = (password, confirmPass) => {
  let message = '';
  if (password < 6) message = 'A senha deve ter pelo menos 6 caracteres';
  if (password !== confirmPass) message = 'As senhas tem que ser iguais';
  return message;
};

const validName = (name, lastName) => {
  let message = '';
  if (name.length < 3 || typeof name !== 'string')
    message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  if (lastName.length < 3 || typeof lastName !== 'string')
    message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  return message;
};

const renderCadastro = (_req, res) => {
  res.render('admin/cadastro', { message: null });
};

const addUser = async (req, res) => {
  const { email, password, confirmPassword, name, lastName } = req.body;
  // console.log(email, password, name, lastName);

  if (!email || !password || !confirmPassword || !name || !lastName) {
    res.render('admin/cadastro', { message: 'Preencha todos os campos' });
  }

  const vEmail = validEmail(email);
  const vName = validName(name, lastName);
  const vPassword = validPassword(password, confirmPassword);

  if (vEmail || vName || vPassword) {
    res.render('admin/cadastro', { message: vEmail || vName || vPassword });
  } else {
    const insertUser = await userModel.newUser(email, password, name, lastName);
    if (!insertUser)
      res.render('admin/cadastro', { message: 'Erro ao cadastrar usuário no banco de dados' });
    return res.render('admin/login', { message: 'Cadastrado com sucesso', redirect: null });
  }
};

module.exports = {
  login,
  loginForm,
  logout,
  renderCadastro,
  addUser,
};

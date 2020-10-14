const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');
const recipesModel = require('../models/recipesModel');

const loginForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('admin/login', {
    message: null,
    redirect: req.query.redirect,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

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
  res.redirect('/');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

const editUser = async (req, res) => {
  res.render('editUser', { user: req.user });
};

const confirmChanges = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const userID = req.user.id;

  await userModel.editUser(userID, email, password, firstName, lastName);
  const recipes = await recipesModel.getRecipes();

  return res.render('home', { user: req.user, recipes });
};

module.exports = {
  login,
  loginForm,
  logout,
  editUser,
  confirmChanges,
};

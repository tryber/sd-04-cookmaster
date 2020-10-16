const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/user');
const recipeModel = require('../models/Recipe.js');

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

  if (!email || !password) {
    return res.render('admin/login', {
      message: 'Preencha o email e a senha',
      redirect: null,
    });
  }

  const userData = await userModel.user(email, password);
  const user = userData[0];
  const token = uuid();

  if (!user) {
    return res.render('admin/login', {
      message: 'Email ou senha incorretos',
      redirect: null,
    });
  }

  SESSIONS[token] = user.id;
  res.cookie('token', token, { httpOnly: true, sameSite: true });

  return res.redirect('/');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');

  return res.render('admin/logout');
};

const updateProfile = async (req, res) => {
  const userData = req.body;
  const { user } = req;

  if (Object.keys(userData).length === 0) return res.render('admin/edit-user', { user, messages: null });

  userData.userId = user.id;
  await userModel.update(userData);

  return res.redirect('/');
};

const getUserRecipes = async (req, res) => {
  const { user } = req;
  const recipes = await recipeModel.recipes(user.id);

  return recipes
    ? res.render('my-recipes', { user, recipes })
    : res.redirect(204, '/');
};

module.exports = {
  login,
  loginForm,
  logout,
  getUserRecipes,
  updateProfile,
};

const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');
const userModel = require('../models/userModel');
const checkInputs = require('./validInputs');

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

// Renderiza formulário cadastro
const formRegister = (req, res) => {
  // const { email, passWord, firstName, lastName } = req.body;
  res.render('users/register');
};

// Add usuário aparti do formulário cadastro
const userRegister = async (req, res) => {
  const { email, passWord, confirmPassWord, firstName, lastName } = req.body;

  // Recebe os inputs do body e valida com a função checkInputs
  const validator = checkInputs.validate({ email, passWord, confirmPassWord, firstName, lastName });

  // Retorna o erro do input não validado
  if (validator.error) {
    return res.status(400).send(validator.error.message);
  }
  // Efetua o cadastro do usuário no banco e renderiza a pagina de sucesso
  userModel
    .addUser(email, passWord, firstName, lastName)
    .then(() => res.status(200).render('users/success'));
};

// Obtên uma receita do usuáiro
const recipesUser = async (req, res) => {
  // const { id } = req.body;
  const recipe = await userModel.getRecipesId(req.params.id);
  res.status(200).render('users/recipesId', { recipe, user: req.user });
};

// Obtên todas as receitas do usuário
const recipesAllUser = async (req, res) => {
  const recipes = await userModel.getAllRecipesId(req.user.id);
  // console.log(recipes);
  res.status(200).render('users/recipes', { recipes, message: null, user: req.user });
};

module.exports = {
  login,
  loginForm,
  logout,
  userRegister,
  formRegister,
  recipesUser,
  recipesAllUser,
};

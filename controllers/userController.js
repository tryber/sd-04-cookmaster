const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');
const { validation, createUser } = require('../models/signUpModel');

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

const signup = (_req, res) => {
  res.render('admin/signup', { message: null });
};

const newUser = async (req, res) => {
  const isValid = await validation({ ...req.body });

  if (!isValid) return res.status(400).render('admin/signup', { ...isValid });

  await createUser({ ...req.body });
  res.status(200).render('admin/signup', { ...isValid });
};

const editUserRender = (req, res) => {
  return res.render('my-recipes/myRegister', { message: null, user: req.user })
}

const editUser = async (req, res) => {
  const { id } = req.user;
  const { email, password, passwordConfirmation, first_name, last_name } = req.body;
  const isValid = await validation({ ...req.body });

  if(isValid) {
    await userModel.editUser(id, email, password, first_name, last_name);
    return res.redirect('/');
  }
  return res.render('my-recipes/myRegister', { ...isValid, user: req.user })
}

module.exports = {
  login,
  loginForm,
  logout,
  signup,
  newUser,
  editUserRender,
  editUser
};

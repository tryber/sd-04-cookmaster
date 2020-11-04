const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');
const { findById, editUser } = require('../models/userModel');
const { validation } = require('../controllers/registerController');

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

const updateUserForm = async (req, res) => {
  const { id } = req.user;

  const user = await findById(id);

  if (id !== user.id) return res.redirect('/login');
  return res.render('editUser', { message: null, user: req.user });
};

const updateUser = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  const { id } = req.user;
  const regexVerification = await validation(email, firstName, lastName);

  if (!email || !password || !confirmPassword || !firstName || !lastName) {
    return res.render('editUser', { message: 'Você deve preencher todos os campos' });
  }

  if (password.length < 6) return res.render('editUser', { message: 'A senha deve ter pelo menos 6 caracteres' });

  if (password !== confirmPassword) res.render('editUser', { message: 'As senhas tem que ser iguais' });

  if (regexVerification === '') {
    await editUser(id, email, password, firstName, lastName);
    return res.redirect('/');
  }

  return res.render('editUser', { message: regexVerification });
};

module.exports = {
  login,
  loginForm,
  logout,
  updateUserForm,
  updateUser,
};

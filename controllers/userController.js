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
  return res.redirect(redirect || '/');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

const registerUsersController = async (req, res) => {
  if (req.body && req.validation) {
    const { email, password, name, lastName } = req.body;
    await userModel.createUserModel(email, password, name, lastName);
    return res.render('registerUser', { message: req.message });
  }
  return res.render('registerUser', {
    redirect: null,
    message: null || req.message,
  });
};

const getEditUser = async (req, res) => {
  try {
    const { id } = req.user;
    const userId = await userModel.findById(id);

    return res.render('editUser', { userId, message: null });
  } catch (error) {
    return error;
  }
};

const postEditUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { password, email, name, lastName } = req.body;
    const userId = await userModel.findById(id);

    if (userId.id === id) {
      await userModel.editUserModel(id, email, password, name, lastName);
      return res.redirect('/');
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  login,
  loginForm,
  logout,
  registerUser: registerUsersController,
  getEditUser,
  postEditUser,
};

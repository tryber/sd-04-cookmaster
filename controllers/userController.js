const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');
const { validationsForms} = require('../models/validationsForms');

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

const editUser = (req, res) => {
  res.render('editUser', {user: req.user, message: null });
};

const confirmEdit = async (req, res) => {
  const { idUser } = req.user;
  const {email, password, confirPassword:passwordConfirm, name:first_name, lastName:last_name} = req.body;
  console.log("variaveis",email, password, passwordConfirm, first_name, last_name);
  const valid = await validationsForms({email, password, passwordConfirm, first_name, last_name});
  console.log("VARIAVEL VALUE",valid );
  if (valid) {
    await userModel.saveEdit(idUser, email, password, first_name, last_name);
    return res.redirect('/');
  }
  return res.render('editeUser',{valid, user: req.user})
};

module.exports = {
  login,
  loginForm,
  logout,
  editUser,
  confirmEdit,
};

const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const UserModel = require('../models/userModel');

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

  const user = await UserModel.findByEmail(email);
  if (!user || user.password !== password)
    return res.render('admin/login', {
      message: 'Email ou senha incorretos',
      redirect: null,
    });

  const token = uuid();

  console.log("linha 35", req.user);
  SESSIONS[token] = user.id;

  res.cookie('token', token, { httpOnly: true, sameSite: true });
  res.redirect(redirect || '/');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

const newUser = (req, res) => {
    const { email, password, firstName, lastName } = req.body

  if(!UserModel.isValidEmail(email))
    return res.status(402).json({ data: 'Dados errados' })
    
  UserModel.addUser(email, password, firstName, lastName)
    .then(sucess => res.status(200).json({ data: 'Cadastrado' }) )
}


module.exports = {
  login,
  loginForm,
  logout,
  newUser
};

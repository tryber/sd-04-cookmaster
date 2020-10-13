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

//Renderiza formulário cadastro
const formRegister = (req, res) => {
  //const { email, passWord, firstName, lastName } = req.body;
  res.render('users/register');
};

//Add usuário aparti do formulário cadastro
const userRegister = (req, res) => {
  //console.log(req.body);
  const { email, passWord, confirmPassWord, firstName, lastName } = req.body;
  console.log({ email, passWord, confirmPassWord, firstName, lastName });

  if (!userModel.isValidEmail(email)) {
    return res.status(400).send('O email deve ter o formato email@mail.com');
  }

  if (!userModel.isValidName(firstName)) {
    return res
      .status(400)
      .send('O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  }

  if (!userModel.isValidLastName(lastName)) {
    return res
      .status(400)
      .send('O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  }

  if (!userModel.isValidPassWord(passWord)) {
    return res.status(400).send('A senha deve ter pelo menos 6 caracteres');
  }

  if (!userModel.comparPassword(passWord, confirmPassWord)) {
    return res.status(400).send('As senhas tem que ser iguais');
  }

  userModel
    .addUser(email, passWord, firstName, lastName)
    .then((sucess) => res.status(200).render('users/success'));
};

module.exports = {
  login,
  loginForm,
  logout,
  userRegister,
  formRegister,
};

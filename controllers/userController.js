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
// -------------------------------------------------
// -------------------------------------------------

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const redirect = req.query.redirect;

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
  res.redirect(redirect || '/admin');
};

// -------------------------------------------------
// -------------------------------------------------

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

// -------------------------------------------------
// -------------------------------------------------

const newUser = async (req, res) => {
  const { email, password, confirm_password, first_name, last_name } = req.body;

  const emailRegex = /\S+@\S+\.\S+/;

  // Validação email
  if (!emailRegex.test(email))
    return res.render('cadastro', {
      message: 'O email deve ter o formato email@mail.com',
    });

  // Validação todos os campos
  if (!email || !password || !first_name || !last_name)
    return res.render('cadastro', {
      message: 'Preencha todos os campos',
    });

  // Validação da senha
  if (password.length < 6)
    return res.render('cadastro', {
      message: 'A senha deve ter pelo menos 6 caracteres',
    });

  // Validação das duas senhas
  if (password !== confirm_password)
    return res.render('cadastro', {
      message: 'As senhas tem que ser iguais',
    });

  // Validação do nome
  if (first_name.length < 3 || typeof first_name !== 'string')
    return res.render('cadastro', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });

  // Validação do sobrenome
  if (last_name.length < 3 || typeof last_name !== 'string')
    return res.render('cadastro', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });

  await userModel.createUser(email, password, first_name, last_name);
  return res.status(200).render('cadastro', {
    message: 'Cadastro efetuado com sucesso!',
  });
};

module.exports = {
  login,
  loginForm,
  logout,
  newUser,
};

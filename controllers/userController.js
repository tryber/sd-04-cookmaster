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

const emailAndNameValidation = (email, firstName, lastName) => {
  const emailRegex = /\S+@\S+\.\S+/;
  let message;

  if (!emailRegex.test(email)) message = 'O email deve ter o formato email@mail.com';

  if (firstName.length < 3 || typeof firstName !== 'string') {
    message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  if (lastName.length < 3 || typeof lastName !== 'string') {
    message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }

  return message;
};

const newUser = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  // const emailRegex = /\S+@\S+\.\S+/;

  // if (!emailRegex.test(email))
  //   return res.render('cadastro', {
  //     message: 'O email deve ter o formato email@mail.com',
  //   });

  // if (firstName.length < 3 || typeof firstName !== 'string')
  // return res.render('cadastro', {
  //   message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  // });

  // if (lastName.length < 3 || typeof lastName !== 'string')
  //   return res.render('cadastro', {
  //     message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  //   });

  const returnMessage = emailAndNameValidation(email, firstName, lastName);

  if (returnMessage) {
    return res.render('cadastro', { message: returnMessage });
  }

  if (!email || !password || !firstName || !lastName)
    return res.render('cadastro', {
      message: 'Preencha todos os campos',
    });

  if (password.length < 6)
    return res.render('cadastro', {
      message: 'A senha deve ter pelo menos 6 caracteres',
    });

  if (password !== confirmPassword)
    return res.render('cadastro', {
      message: 'As senhas tem que ser iguais',
    });

  await userModel.createUser(email, password, firstName, lastName);
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

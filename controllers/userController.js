const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');

// const idController = async (req) => {
//   const { name, ingredientList, steps } = req.body;
//   console.log(name, ingredientList, steps)
// };

// const formSubmit = async (req, res) => {
//   const { email, password, checkPassword, name, lastName, redirect } = req.body;
//   if (password !== checkPassword) {
//     return res.render('cadastro', {
//       message: 'Senha não confere',
//       redirect: null,
//     });
//   }
//   const user = await userModel.findByEmail(email);
//   if (user)
//     return res.render('cadastro', {
//       message: 'Email já cadastrado',
//       redirect: null,
//     });
//   await userModel.createUser(email, password, name, lastName);
//   res.redirect(redirect || '/');
// };

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
  if (!user || user.pass !== password)
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

const emailRegex = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
const passwordRegex = /^(\d|\w){6,}$/;
const userNameRegex = /\w{3,}/;

const userRegistration = (_req, res) => res.render('register', { message: null });
const userRegistrationSuccess = async (req, res) => {
  const { email, password, checkPassword, name, lastName } = req.body;
  switch (true) {
    case !emailRegex.test(email):
      return res.render('register', {
        message: 'O email deve ter o formato email@mail.com',
      });
    case !passwordRegex.test(password):
      return res.render('register', {
        message: 'A senha deve ter pelo menos 6 caracteres',
      });
    case (password !== checkPassword):
      return res.render('register', { message: 'As senhas tem que ser iguais' });
    case (!userNameRegex.test(name)):
      return res.render('register', {
        message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      });
    case (!userNameRegex.test(lastName)):
      return res.render('register', {
        message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      });
    default:
      await userModel.registerModel({ ...req.body });
      return res.status(200).render('register', { message: 'Cadastro efetuado com sucesso!' });
  }
};

const editUserPage = async (req, res) => {
  const user = req.user;
  return res.render('admin/editUser', { user });
};

const editUser = async (req, res) => {
  const userId = req.user.id;
  const { email, password, name, lastName } = req.body;
  await userModel.editUserModel(email, password, name, lastName, userId);
  return res.redirect('/');
};


module.exports = {
  login,
  loginForm,
  logout,
  userRegistration,
  userRegistrationSuccess,
  editUserPage,
  editUser,
  // idController,
  // formSubmit
};

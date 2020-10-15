const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');
const yup = require('yup');

const userModel = require('../models/userModel');
const receita = require('../models/homeModel');

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

const schema = yup.object().shape({
  email: yup
    .string()
    .email('O email deve ter o formato email@mail.com')
    .required('O email deve ter o formato email@mail.com'),
  senha: yup
    .string('A senha deve ter pelo menos 6 caracteres')
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required(),
  confirma: yup
    .string()
    .min(6)
    .when('senha', (senha, field) =>
      senha ? field.required().oneOf([yup.ref('senha'), 'As senhas tem que ser iguais']) : field,
    )
    .required(),
  nome: yup
    .string()
    .min(3, 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras')
    .required(),
  sobrenome: yup
    .string()
    .min(3, 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras')
    .required(),
});

const cadastrar = async (req, res) => {
  const receitas = await receita.acharReceitas();
  try {
    const results = await schema.validate(req.body, { abortEarly: false });
    // console.log('results dentro do try');
    const { email, senha, nome, sobrenome } = req.body;
    await userModel.cadastrarUsuario(email, senha, nome, sobrenome);
    const cadastroValido = results;
    const receitaCadastrada = null;
    const usuario = req.body;
    return res.render('home', { cadastroValido, usuario, receitas });
  } catch (error) {
    const erroData = error.inner.map((e) => ({ nome: e.path, msg: e.errors[0] }));
    // console.log('results dentro do catch', erroData);
    return res.render('cadastro', { erroData });
  }

  // const { email, senha, nome, sobrenome } = req.body;
  // await userModel.cadastrarUsuario(email, senha, nome, sobrenome);
  // res.redirect('/');
};

module.exports = {
  login,
  loginForm,
  logout,
  cadastrar,
};

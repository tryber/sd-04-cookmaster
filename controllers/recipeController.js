const recipeModel = require('../models/recipeModel');
const homeModel = require('../models/homeModel');

const index = async (req, res) => {
  const receita = await recipeModel.receitaById(req.params.id);
  // console.log('params', req.params);
  // console.log('id', req.params.id);
  // console.log('receita', receita)
  res.render('show', { receita, usuario: req.user });
};

const buscar = async (req, res) => {
  const { q } = req.query;
  const receita = await recipeModel.receitaByNome(q);
  res.render('buscar', { usuario: req.user, receita });
};

const novaReceita = async (req, res) => {
  const usuario = req.user;
  res.render('nova', { usuario });
};

const cadastrarReceita = async (req, res) => {
  const receitas = await homeModel.acharReceitas();
  const { nomeReceita, preparo, ingredientes, nomeUsuario, idUsuario } = req.body;
  // console.log('post', nomeReceita, preparo, ingredientes, nomeUsuario, idUsuario)
  await recipeModel.cadastrarReceita(nomeReceita, preparo, ingredientes, nomeUsuario, idUsuario);
  const receitaCadastrada = true;
  const cadastroValido = null;
  const usuario = req.body;
  res.render('home', { receitaCadastrada, receitas, usuario, cadastroValido });
  // res.redirect('/');
};

const editar = async (req, res) => {
  const usuario = req.user;
  // console.log('req.params', req.params.id);
  const receita = await recipeModel.receitaById(req.params.id);
  res.render('edit', { usuario, receita });
};

const atualizarReceita = async (req, res) => {
  const { nomeReceita, preparo, ingredientes } = req.body;
  const id = req.params.id;
  await recipeModel.atualizarBanco(nomeReceita, preparo, ingredientes, id);
  return res.redirect(`/recipes/${id}`);
};

const minhas = async (req, res) => {
  const usuario = req.user;
  const receitas = await recipeModel.receitaByUsuario(usuario.id);
  return res.render('minhas', { usuario, receitas });
};

const deletar = async (req, res) => {
  console.log('oi')
}

module.exports = {
  index,
  buscar,
  novaReceita,
  cadastrarReceita,
  editar,
  atualizarReceita,
  minhas,
  deletar,
};

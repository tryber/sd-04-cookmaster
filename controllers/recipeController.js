const recipeModel = require('../models/recipeModel');

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
  const { nomeReceita, preparo, ingredientes, nomeUsuario, idUsuario } = req.body;
  // console.log('post', nomeReceita, preparo, ingredientes, nomeUsuario, idUsuario)
  await recipeModel.cadastrarReceita(nomeReceita, preparo, ingredientes, nomeUsuario, idUsuario);
  const receitaCadastrada = true;
  // res.render('home', {receitaCadastrada})
  res.redirect('/');
};
module.exports = {
  index,
  buscar,
  novaReceita,
  cadastrarReceita,
};

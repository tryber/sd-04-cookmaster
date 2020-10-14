const recipeModel = require('../models/recipeModel');

const index = async (req, res) => {
  const receita = await recipeModel.receitaById(req.params.id);
  // console.log('params', req.params);
  // console.log('id', req.params.id);
  // console.log('receita', receita)
  res.render('show', { receita, usuario: req.user });
};

const buscar = async (req, res) => {

  return res.redirect('/recipe/serach')
};

module.exports = {
  index,
  buscar,
};

const recipeModel = require('../models/recipeModel');

const index = async (req, res) => {
  
  const receita = await recipeModel.receitaById(req.params.id);
  console.log('params', req.params)
  console.log('id', req.params.id)
  res.render('show', { receita, usuario: req.user});
};

module.exports = {
  index,
};

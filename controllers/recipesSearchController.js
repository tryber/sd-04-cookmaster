const recipesModel = require('../models/recipesSearchModel');

const recipeSearchInput = async (req, res) => {
  const recipes = await recipesModel(req.query.q);
  res.render('recipesSearch', {
    recipes,
    message: 'Nenhuma receita encontrada',
    user: req.user,
  });
};

module.exports = {
  recipeSearchInput,
};

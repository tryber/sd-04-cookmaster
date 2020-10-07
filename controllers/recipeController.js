const recipeModel = require('../models/recipeModel');

const home = async (req, res) => {
  const recipes = await recipeModel.findAll();

  res.render('home', { recipes, user: req.user });
};

const detailsRecipe = async (req, res) => {
  const { id } = req.params;

  const recipe = await recipeModel.findOne(id);

  res.render('recipes/details', { recipe, user: req.user });
};

module.exports = {
  detailsRecipe,
  home,
};

const recipesModel = require('../models/recipesModel');

const allRecipes = async (req, res) => {
  const recipes = await recipesModel.fetchAllRecipesModel();
  res.render('home', { recipes, message: null, user: req.user });
};

const recipePage = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.fetchRecipeIdModel(id);
  res.render('recipe', { recipe, message: null, user: req.user });
};
module.exports = { allRecipes, recipePage };

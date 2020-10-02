const Recipes = require('../models/recipeModel');

const listAllRecipes = async (_req, res) => {
  const recipes = await Recipes.getAllRecipes();
  res.render('/', { recipes });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipes.getRecipeById(id);

  if (!id) res.status(404).render('notFound');

  res.render('recipes', { recipe });
};

module.exports = { recipeDetails, listAllRecipes };

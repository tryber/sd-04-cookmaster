const Recipes = require('../models/recipeModel');

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipes.getRecipeById(id);

  if (!id) res.status(404).render('notFound');

  res.render('recipeDetails', { recipe });
};

module.exports = { recipeDetails };

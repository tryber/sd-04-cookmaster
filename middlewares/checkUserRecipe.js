const recipeModel = require('../models/recipesByIdModel');

const checkUserRecipe = async (req, res, next) => {
  const recipe = await recipeModel(req.params.id);
  if (recipe[0][1] !== req.user.id) return res.redirect(`/recipes/${req.params.id}`);
  next()
};

module.exports = checkUserRecipe;

const Recipe = require('../models/recipeModel');

const searchRecipe = async (req, res) => {
  const user = req.user;
  const { q } = req.query;
  const recipes = await Recipe.searchRecipe(q);
  res.render('search', { recipes, user });
};

module.exports = {
  searchRecipe,
};

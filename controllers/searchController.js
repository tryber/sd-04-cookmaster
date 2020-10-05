const { stringify } = require('uuid');
const Recipe = require('../models/recipeModel');

const searchRecipe = async (req, res) => {
  const user = req.user;
  const { q } = req.query;
  console.log('q', q);
  let recipes = await Recipe.searchRecipe(q);
  const { f } = req.params;
  await console.log('recipes', f);
  res.render('search', { recipes, user });
};

module.exports = {
  searchRecipe,
};

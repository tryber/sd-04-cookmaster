const recipes = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipe = await recipes.getRecipes();
  console.log(recipe);
  res.render('home', { recipe });
};

module.exports = { listRecipes };

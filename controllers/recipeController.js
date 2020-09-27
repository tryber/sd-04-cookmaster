const recipes = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipes = await recipes.getAllRecipes();
  res.render('home', { recipes });
};

module.exports = { listRecipes };

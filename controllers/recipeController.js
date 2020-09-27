const recipesModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipes = await recipesModel.getAllRecipes();
  console.log('recipes:', recipes);
  res.render('home', { recipes });
};

module.exports = { listRecipes };

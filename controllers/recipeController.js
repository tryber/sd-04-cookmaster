const recipesModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipes = await recipesModel.getAllRecipes();
  const { user = null } = req;
  res.render('home', { recipes, user });
};

module.exports = { listRecipes };

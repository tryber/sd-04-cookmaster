const recipesModel = require('../models/recipesModel')

const allRecipes = async (req, res) => {
  const recipes = await recipesModel.fetchAllRecipesModel();
  res.render('home', { recipes, message: null, user: req.user });
};

module.exports = { allRecipes };

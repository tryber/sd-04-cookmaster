const recipeModel = require('../models/recipeModel');

const listAllRecipes = async (req, res) => {
  const recipes = await recipeModel.findAllRecipes();
  res.render('home', { user: req.user, recipes });
};

module.exports = { listAllRecipes };

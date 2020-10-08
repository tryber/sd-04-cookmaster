const recipeModel = require('../models/recipeModel');

async function listRecipes(req, res) {
  const recipes = await recipeModel.getAllRecipes();
  return res.render('home', { recipes, user: req.user });
}

module.exports = { listRecipes };

const recipesModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipes = await recipesModel.getAllRecipes();
  const user = req.body.user ?? null; 
  res.render('home', { recipes, user });
};

module.exports = { listRecipes };

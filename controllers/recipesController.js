const Recipes = require('../models/recipesModel');

const showAll = async (req, res) => {
  const allRecipes = await Recipes.getAll();

  res.render('home', { allRecipes, user: req.user });
};

module.exports = { showAll };

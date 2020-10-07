const recipesModels = require('../models/recipesModels');

const index = async (req, res) => {
  const recipes = await recipesModels.getAllRecipes();

  res.render('home', { recipes, user: req.user });
};

module.exports = {
  index,
};

const Recipes = require('../models/recipesModel');

const index = async (req, res) => {
  const recipes = await Recipes.listRecipes();
  const user = req.user;
  return res.render('home', { recipes, user });
};

module.exports = {
  index,
};

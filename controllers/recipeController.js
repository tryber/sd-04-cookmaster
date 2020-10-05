const recipe = require('../models/recipeModel');

const index = async (req, res) => {
  const recipes = await recipe.findAll();

  res.render('home', { recipes, user: req.user });
};

module.exports = {
  index,
};

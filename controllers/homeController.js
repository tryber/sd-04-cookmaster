const Recipe = require('../models/homeModel');

const listRecipes = async (req, res) => {
  const recipes = await Recipe.findAll();
  const { user = '' } = req;
  res.render('home', { recipes, user });
};

module.exports = {
  listRecipes,
};

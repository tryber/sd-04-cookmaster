const recipeModel = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  // const { token = '' } = req.cookies || {};
  const recipes = await recipeModel.getAllRecipes();
  // res.render('home', { recipes, isLogged: token });
  res.render('home', { recipes, message: null, user: req.user });
};

module.exports = {
  listRecipes,
};

const Recipe = require('../models/recipesModel');

const home = async (req, res) => {
  const recipes = await Recipe.findAll();
  res.render('home', { recipes, user: req.user });
};

const recipeDetails = async (req, res) => {
  const recipes = await Recipe.findById(req.params.id);
  res.render('recipes', { recipes, user: req.user });
};

const search = async (req, res) => {
  const param = req.query.q;
  const recipes = await Recipe.findByName(param);
  console.log(recipes)
  res.render('search', { param, recipes });
};

module.exports = {
  home,
  recipeDetails,
  search,
};

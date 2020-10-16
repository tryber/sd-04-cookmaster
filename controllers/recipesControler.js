const recipesModel = require('../models/recipesModel');
// const userModel = require('../models/userModel')

const index = async (req, res) => {
  const recipes = await recipesModel.getAll();
  res.render('home', { recipes, user: req.user });
};

const show = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.recipeById(id);

  res.render('seeRecipe', { ...recipe, user: req.user });
};

module.exports = {
  index,
  show,
  // userBuildings,
  // add,
  // create
};

const recipesModel = require('../models/recipesModel');
// const userModel = require('../models/userModel')

const index = async (req, res) => {
  const recipes = await recipesModel.getAll();
  res.render('home', { recipes, user: req.user });
};

const seeRecipe = async (req, res) => {
  const recipe = await recipeModel.getById(req.params.id);

  res.render('seeRecipe', { recipe, user: req.user });
};

module.exports = {
  index,
  seeRecipe,
  // userBuildings,
  // add,
  // create
};

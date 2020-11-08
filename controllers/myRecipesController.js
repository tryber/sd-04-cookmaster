const myRecipesModel = require('../models/myRecipesModel');

const showAllMyRecipes = async (req, res) => {
  const { id } = req.user;
  const recipes = await myRecipesModel.showMyRecipes(id);
  return res.render('my-recipes/showRecipes', { recipes, user: req.user });
};

module.exports = { showAllMyRecipes };

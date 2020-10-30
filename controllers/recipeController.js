const recipeModel = require('../models/recipeModel');

const getAllRecipes = async (req, res) => {
  const recipes = await recipeModel.findAllRecipes();
  console.log(recipes)
  return res.render('home', {
    recipes,
    message: `foram encontrados ${recipes.length} receitas`,
    user: req.user,
  });
};

module.exports = {
  getAllRecipes,
};

const recipesModel = require('../models/recipesModel');

const showAll = async (req, res) => {
  try {
    const recipes = await recipesModel.getAllRecipes();
    return res.render('home', { user: req.user, data: recipes });
  } catch (error) {
    return res.render('error', { error });
  }
};

const showOne = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesModel.getRecipeById(id);
    recipe.ingredients = recipe.ingredients.split(',');
    return res.render('recipes/view', { user: req.user, recipe });
  } catch (error) {
    return res.render('error', { error });
  }
};

module.exports = {
  showOne,
  showAll,
};

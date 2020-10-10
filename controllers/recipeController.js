const recipe = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  try {
    const recipes = await recipe.getAllRecipes();
    return res.render('home', { recipes, user: req.user });
  } catch (error) {
    return error;
  }
};

const showRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipeResult = await recipe.getRecipeById(Number(id));
    return res.render('recipe', { recipeResult, user: req.user });
  } catch (error) {
    return error;
  }
};

const editRecipe = async (req, res) => res.render('admin/editRecipe');

const deleteRecipe = async (req, res) => res.render('admin/editRecipe');

const newRecipe = async (req, res) => {
  const recipeInfo = req.body;
  const userInfo = req.user;
  try {
    if (Object.keys(recipeInfo).length) {
      await recipe.addNewRecipe(recipeInfo, userInfo);
    }
    return res.render('admin/newRecipe', { user: req.user });
  } catch (err) {
    return err;
  }
};

const searchRecipes = async (req, res) => {
  const { q } = req.query;
  try {
    const recipes = await recipe.getRecipesByQuery(q);
    return res.render('admin/searchRecipes', { recipes, user: req.user });
  } catch (err) {
    return err;
  }
};

module.exports = {
  listRecipes,
  showRecipeById,
  editRecipe,
  deleteRecipe,
  searchRecipes,
  newRecipe,
};

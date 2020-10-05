const { recipesModel } = require('../models');

const listAllRecipes = async (req, res) => {
  try {
    const getAllRecipes = await recipesModel.getAllRecipes();
    return res.render('home', { getAllRecipes, user: req.user });
  } catch (error) {
    return error;
  }
};

const recipeDetailsController = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeDetails = await recipesModel.recipeDetails(id);
    return res.render('recipeDetails', { recipeDetails, user: req.user });
  } catch (error) {
    return error;
  }
};

const searchByNameController = async (req, res) => {
  try {
    const { q } = req.query;
    const searchByName = await recipesModel.recipeSearchByName(q);
    return res.render('recipeSearch', { searchByName, user: req.user });
  } catch (error) {
    return error;
  }
};

module.exports = {
  listAllRecipes,
  recipeDetailsController,
  searchByNameController,
};

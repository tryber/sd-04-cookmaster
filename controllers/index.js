const userController = require('./userController');
const recipesController = require('./homeController');
const signUpController = require('./signUpController');
const recipeDetailsController = require('./recipeDetailsController');
const searchController = require('./searchController');
const meRecipesController = require('./meRecipesController');
const newRecipeController = require('./newRecipeController');
const deleteRecipeController = require('./deleteRecipeController');

module.exports = {
  userController,
  recipesController,
  signUpController,
  recipeDetailsController,
  searchController,
  meRecipesController,
  newRecipeController,
  deleteRecipeController,
};

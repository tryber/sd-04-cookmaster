const middlewares = require('../middlewares');
const { Router } = require('express');

const { recipeController } = require('../controllers');

const recipe = Router();

recipe.get('/search', recipeController.notFilteredRecipes);
recipe.post('/search', recipeController.searchFilterRecipes);

recipe.get('/new', middlewares.auth(), (_req, res) => {
  res.render('newRecipe');
});
recipe.post('/new', middlewares.auth(), recipeController.recipeRegister);

recipe.get('/:id', middlewares.auth(false), recipeController.recipeDetails);
recipe.get('/:id/edit', middlewares.auth(), recipeController.editRecipeValidation);
recipe.post('/:id/edit', middlewares.auth(), recipeController.editRecipe);


module.exports = recipe;

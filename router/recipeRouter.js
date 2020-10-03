const { Router } = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');

const recipeRouter = Router();

recipeRouter.get('/search', middlewares.auth(false), controllers.recipesController.searchRecipe);

recipeRouter.get('/new', middlewares.auth(), controllers.recipesController.newRecipe);
recipeRouter.post('/', middlewares.auth(), controllers.recipesController.createRecipe);

recipeRouter.get('/:id', middlewares.auth(false), controllers.recipesController.showRecipe);
recipeRouter.get('/:id/edit', middlewares.auth(), controllers.recipesController.editRecipe);

module.exports = recipeRouter;

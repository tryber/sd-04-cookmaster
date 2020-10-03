const { Router } = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');

const recipeRouter = Router();

recipeRouter.get('/:id', middlewares.auth(false), controllers.recipesController.showRecipe);

module.exports = recipeRouter;

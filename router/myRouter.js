const { Router } = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const myRouter = Router();

myRouter.get('/recipes', middlewares.auth(), controllers.myRecipesController.showAllMyRecipes);

module.exports = myRouter;

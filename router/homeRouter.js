const middlewares = require('../middlewares');
const { Router } = require('express');
const { recipesController } = require('../controllers');

const homeRouter = Router();

homeRouter.get('/', middlewares.auth(false), recipesController.showAllRecipes);

module.exports = homeRouter;

const { Router } = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const myRouter = Router();

myRouter.get('/recipes', middlewares.auth(), controllers.myRecipesController.showAllMyRecipes);

myRouter.get('/edit', middlewares.auth(), controllers.userController.editUserRender);
myRouter.post('/', middlewares.auth(), controllers.userController.editUser);

module.exports = myRouter;

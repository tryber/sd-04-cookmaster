const middlewares = require('../middlewares');
const { Router } = require('express');
const controllers = require('../controllers');

const homeRouter = Router();

homeRouter.get('/', middlewares.auth(false), controllers.recipesController.showAllRecipes);

homeRouter.get('/signup', controllers.userController.signup);
homeRouter.post('/signup', controllers.userController.newUser);

homeRouter.get('/login', controllers.userController.loginForm);
homeRouter.get('/logout', controllers.userController.logout);
homeRouter.post('/login', controllers.userController.login);

module.exports = homeRouter;

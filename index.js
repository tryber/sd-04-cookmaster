const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipesController);

app.get('/recipes/search', middlewares.auth(false), controllers.recipesSearchController.recipeSearchInput);

app.get('/recipes/new', middlewares.auth(), controllers.recipesNewController.recipesNewForm);

app.post('/recipes', middlewares.auth(), controllers.recipesNewController.recipesNew);

app.get('/recipes/:id/edit', middlewares.auth(), middlewares.checkUserRecipe, controllers.recipesEditController.recipeEditForm);

app.get('/recipes/:id/delete', middlewares.auth(), middlewares.checkUserRecipe, controllers.recipesDeleteController.recipeDeleteForm);

app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipesDeleteController.recipeDelete);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipesDetailsController);

app.post('/recipes/:id', controllers.recipesEditController.recipeEdit);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/register', controllers.registerUserController.registerForm);
app.post('/register',
  controllers.registerUserController.verifyEmpty,
  controllers.registerUserController.verifyEmail,
  controllers.registerUserController.verifyPasswordLength,
  controllers.registerUserController.verifyPasswordEqual,
  controllers.registerUserController.verifyFirstName,
  controllers.registerUserController.verifyLastsName,
  controllers.registerUserController.register,
);

app.get('/me/recipes', middlewares.auth(), controllers.meRecipesController);

app.get('/me/edit', middlewares.auth(), controllers.meEditController.meEditForm);

app.post('/me/edit', middlewares.auth(), controllers.meEditController.meEdit);

app.listen(3000, () => console.log('Listening on 3000'));

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

app.get('/', controllers.recipeController.showRecipes);

app.get('/admin', middlewares.auth(), controllers.recipeController.showRecipesAdm);

app.route('/user/new')
  .get(controllers.userController.userForm)
  .post(controllers.userController.addUser);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/recipes/new', controllers.recipeController.recipeForm);
app.post('/recipes', middlewares.auth(), controllers.recipeController.addRecipe);

app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.recipeSearch);

app.get('/recipes/edit', controllers.recipeController.recipeEdit); // ???
app.get('/recipes/delete', controllers.recipeController.recipeDelete); // ???

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.showRecipeId);

app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.recipeEditForm);
app.post('/recipes/:id', middlewares.auth(), controllers.recipeController.recipeUpdate);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.recipeDeleteForm);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.recipeDel);

app.get('/me/recipes', middlewares.auth(), controllers.recipeController.showUserRecipes);

app.get('/me/edit', middlewares.auth(), controllers.userController.userEditForm);
app.post('/me/edit', middlewares.auth(), controllers.userController.userUpdate);

app.listen(3000, () => console.log('Listening on 3000'));

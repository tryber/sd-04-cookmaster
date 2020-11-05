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

app.get('/', middlewares.auth(false), controllers.recipeController.index);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/cadastro', (_req, res) => res.render('admin/register', { message: null }));
app.post('/cadastro',
  controllers.signUpController.registerUser);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.excludeRecipeView);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.excludeRecipe);

app.get('/recipes/new', middlewares.auth(), controllers.recipeController.newRecipe);
app.post('/recipes/new', middlewares.auth(), controllers.recipeController.newRecipeForm);

app.get('/me/recipes', middlewares.auth(), controllers.recipeController.myRecipes);

app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.editRecipe);
app.post('/recipes/:id', middlewares.auth(), controllers.recipeController.recipeUpdate);

app.get('/me/edit', middlewares.auth(), controllers.userController.updateUserPage);
app.post('/me/edit', middlewares.auth(), controllers.userController.editUser);

app.get('/recipes/search', controllers.recipeController.searchRecipe);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.findRecipeDetails);
app.listen(3000, () => console.log('Listening on 3000'));

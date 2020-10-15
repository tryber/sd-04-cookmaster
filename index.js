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

app.get('/', middlewares.auth(false), controllers.recipeController.showRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.get('/register', controllers.userController.registerForm);
app.post('/login', controllers.userController.login);
app.post('/register', controllers.userController.register);

app.get('/recipes/new', middlewares.auth(), controllers.recipeController.newRecipeForm);
app.post('/recipes', middlewares.auth(), controllers.recipeController.newRecipe);

app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.searchRecipess);
app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteRecipeForm);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteRecipe);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.seeRecipe);

app.get('/me/recipes', middlewares.auth(), controllers.recipeController.myRecipe);

app.listen(3000, () => console.log('Listening on 3000'));

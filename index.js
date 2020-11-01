const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipesController.allRecipes);
app.get('/recipes/search', middlewares.auth(false), controllers.recipesController.searchRecipes);
app.get('/me/recipes', middlewares.auth(), controllers.recipesController.myRecipes);

app.get('/recipes/new', middlewares.auth(), controllers.recipesController.createRecipePage);
app.post('/recipes/new', middlewares.auth(), controllers.recipesController.createRecipe);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipesController.deleteRecipePage);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipesController.deleteRecipe);

app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipesController.editRecipePage);
app.post('/recipes/:id', middlewares.auth(), controllers.recipesController.editRecipe);

app.get('/admin', middlewares.auth(), (req, res) => res.render('admin/home', { user: req.user }));

app.post('/cadastro', controllers.userController.signup);
app.get('/cadastro', controllers.userController.signupForm);

app.get('/logout', controllers.userController.logout);

app.get('/login', controllers.userController.loginForm);
app.post('/login', controllers.userController.login);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.recipePage);

app.get('*', (_req, res) => {
  res.status(404);
  res.render('notFound');
});

app.listen(3000);

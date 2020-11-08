const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const userController = require('./controllers/userController');
const recipesController = require('./controllers/recipesController');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

// home
app.get('/', middlewares.auth(false), recipesController.listAllRecipes);

// admin
app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

// login - logout
app.get('/login', userController.loginForm);
app.get('/logout', userController.logout);
app.post('/login', userController.login);

// signup
app.get('/signup', userController.signupForm);
app.post('/signup', userController.signup);

// search
app.get('/recipes/search', recipesController.searchRecipesByQuery);

// nova receita
app.get('/recipes/new', middlewares.auth(), recipesController.registerNewRecipeForm);
app.post('/recipes', middlewares.auth(), recipesController.registerNewRecipe);

// detalhes
app.get('/recipes/:id', middlewares.auth(false), recipesController.recipeDetail);
app.post('/recipes/:id', middlewares.auth(), recipesController.updateRecipeForm);
app.get('/recipes/:id/edit', middlewares.auth(), recipesController.updateRecipeData);

app.listen(3000, () => console.log('Listening on 3000'));

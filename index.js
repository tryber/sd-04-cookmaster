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

app.get('/', controllers.recipeController.listAllRecipes);

app.get('/recipes/:id', controllers.recipeController.recipeDetails);

app.get('/recipes/new', controllers.recipeController.createRecipe);
app.post('/recipes/new', controllers.recipeController.createRecipe);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/cadastro', (_req, res) => res.render('cadastro'));
// app.post('/cadastro', (_req, res) => res.render('cadastro'));

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Running server on port 3000'));

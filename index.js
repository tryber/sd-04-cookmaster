const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const recipesController = require('./controllers/recipesController');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), recipesController.home);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/signUp', controllers.userController.signUp);
app.post('/signUp', controllers.userController.create);

app.get('/recipes/search', recipesController.search);

app.get('/recipes/new', recipesController.newRecipe);
app.post('/recipes', middlewares.auth(true), recipesController.recipes);

app.get('/recipes/:id', middlewares.auth(false), recipesController.recipeDetails);

app.listen(3000, () => console.log('Listening on 3000'));

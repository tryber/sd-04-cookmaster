const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');
const recipeController = require('./controllers/recipeController');
const signUpController = require('./controllers/signUpController');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));

app.get('/', middlewares.auth(false), recipeController.listRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/signup', signUpController.renderSignup);
app.post('/signup', signUpController.newUser);

app.get('/recipes/search', middlewares.auth(false), recipeController.searchRecipes);

app.get('/recipes/new', middlewares.auth(false), recipeController.newRecipe);
app.post('/recipes', middlewares.auth(false), recipeController.addRecipe);

app.get('/recipes/:id', middlewares.auth(false), recipeController.recipeDetails);
app.post('/recipes/:id', middlewares.auth(false), recipeController.updateRecipe);
app.get('/recipes/:id/edit', middlewares.auth(false), recipeController.editRecipe);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));

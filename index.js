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

app.get('/', middlewares.auth(false), controllers.recipesController.index);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/signup', controllers.userController.renderCadastro);
app.post('/signup', controllers.userController.addUser);

app.get('/recipes/search', controllers.recipesController.findRecipesByName);

app.get('/recipes/new', middlewares.auth(), controllers.recipesController.newRecipe);
app.post('/recipes/new', middlewares.auth(), controllers.recipesController.addRecipe);

app.get('/me/recipes', middlewares.auth(), controllers.recipesController.myRecipes);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.recipesDetails);
app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipesController.showEditRecipe);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipesController.showDeleteRecipe);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipesController.deleteRecipe);

app.listen(3000, () => console.log('Listening on 3000'));

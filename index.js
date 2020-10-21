const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const listRecipes = require('./controllers/recipeController');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipeController.listRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

// app.post('/recipes/:id', middlewares.auth(false), controllers.recipeController.saveEdit);

app.get('/recipes/new', middlewares.auth(), controllers.recipeController.recipeRegister);
app.post('/recipes', middlewares.auth(false), controllers.recipeController.newRecipe);
app.get('/recipes', middlewares.auth(false), controllers.recipeController.listRecipes);

app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.searchRecipe);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.showRecipesByUser);
app.get('/recipes/:id', middlewares.auth(), controllers.recipeController.showRecipesByUser);

app.get('/cadastro', controllers.userController.signUp);
app.post('/cadastro', controllers.userController.newUser);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.recipeEdit);
app.post('/recipes/:id', middlewares.auth(), controllers.recipeController.saveEdit);

app.get('/me/recipes', middlewares.auth(), controllers.recipeController.myRecipes);

app.listen(3000, () => console.log('Listening on 3000'));

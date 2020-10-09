const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.set('view engine', 'ejs');
app.set('views', './views');

// app.get('/', (_req, res) => {
//   return res.render('home');
// });

app.get('/', middlewares.auth(false), controllers.recipesController.listRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/signup', controllers.signUpController.signUpForm);

app.post('/signup', controllers.signUpController.signUpController);


app.get('/recipes/search', middlewares.auth(false), controllers.searchController.searchController);

app.get('/me/recipes', middlewares.auth(), controllers.meRecipesController.meRecipesController);

app.get('/recipes/new', middlewares.auth(), controllers.newRecipeController.renderNewRecipe);

app.post('/recipes', middlewares.auth(), controllers.newRecipeController.postNewRecipe);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeDetailsController.showDetails);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.deleteRecipeController.renderDeleteRecipe);

app.post('/recipes/:id/delete', middlewares.auth(), controllers.deleteRecipeController.postDeleteRecipe);

app.listen(3000, () => console.log('Listening on 3000'));

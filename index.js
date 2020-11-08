const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const { connection } = require('./database');

const middlewares = require('./middlewares');
const controllers = require('./controllers');
// const userModel = require('./models/userModel');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// connection.connect((err) => {
//   const cc = 'erro: ';
//   if (err) {
//     return console.error(cc + err.message);
//   }

//   console.log('Connected to the MySQL server.');
// });

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipeController.showRecipes);
app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/register', controllers.userController.userRegistration);
app.post('/register', controllers.userController.userRegistrationSuccess);

app.get('/me/edit', middlewares.auth(true), controllers.userController.editUserPage);
app.post('/me/edit', middlewares.auth(true), controllers.userController.editUser);

app.get('/recipes/search', controllers.recipeController.searchRecipesController);
app.get('/recipes/search', middlewares.auth(false), (req, res) => {
  return res.render('searchRecipes', { user: req.user });
});

app.get('/me/recipes', middlewares.auth(true), controllers.recipeController.myRecipesPage);

app.get('/recipes/new', middlewares.auth(false), controllers.recipeController.newRecipePage);
app.post('/recipes', middlewares.auth(true), controllers.recipeController.createRecipeController);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.openRecipesController);
app.get('/recipes/:id/edit', middlewares.auth(true), controllers.recipeController.editRecipePage);
app.post('/recipes/:id/', middlewares.auth(true), controllers.recipeController.editRecipe);
app.get('/recipes/:id/delete', middlewares.auth(true), controllers.recipeController.deleteRecipePage);
app.post('/recipes/:id/delete', middlewares.auth(true), controllers.recipeController.deleteRecipes);


app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));

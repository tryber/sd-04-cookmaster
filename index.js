const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const middlewares = require('./middlewares');
const controllers = require('./controllers');
const userController = require('./controllers/userController');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipesController.listAllRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/register', (_req, res) => {
  res.render('registerUser', { message: null });
});
app.post('/register', middlewares.validatedRegister, userController.registerUser);

app.get('/recipes/new', middlewares.auth(), controllers.recipesController.enterNewRecipe);
app.post('/recipes', middlewares.auth(), controllers.recipesController.createNewRecipe);

app.get(
  '/recipes/search',
  middlewares.auth(false),
  controllers.recipesController.searchByNameController,
);

app.get(
  '/recipes/:id',
  middlewares.auth(false),
  controllers.recipesController.recipeDetailsController,
);

app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipesController.enterEditRecipe);
app.post('/recipes/:id', middlewares.auth(), controllers.recipesController.editRecipeController);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipesController.deleteRecipeGET);
app.post(
  '/recipes/:id/delete',
  middlewares.auth(),
  controllers.recipesController.deleteRecipePOST,
);

app.get('/me/recipes', middlewares.auth(), controllers.recipesController.recipeUserId);
app.get('/me/edit', middlewares.auth(), controllers.userController.getEditUser);
app.post('/me', middlewares.auth(), controllers.userController.postEditUser);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

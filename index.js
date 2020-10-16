const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const PORT = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipeController.listRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/cadastro', controllers.registerUserController.getCadastro);
app.post('/cadastro', controllers.registerUserController.registerUser);

app.get('/recipes/new', middlewares.auth(), (_req, res) => res.render('admin/newRecipe'));
app.post('/recipes', middlewares.auth(), controllers.recipeController.createRecipe);

app.get('/recipes/search', controllers.recipeController.searchRecipes);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.getRecipeById);
app.get('/recipes/:id/delete', middlewares.auth(), (req, res) =>
  res.render('admin/confirmPassword', { id: req.params.id, message: '' }),
);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteRecipe);

app.get('/me/recipes', middlewares.auth(), controllers.recipeController.getRecipesByUserID);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

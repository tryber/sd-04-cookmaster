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

app.get('/', middlewares.auth(false), controllers.listAllControler.listRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/register', controllers.userController.register);
app.post('/register', controllers.userController.registerForm);

app.get('/recipes/new', middlewares.auth(), controllers.listAllControler.NewRecipe);
app.post('/recipes/new', middlewares.auth(), controllers.listAllControler.newRecipeForm);

app.get('/recipes/search', middlewares.auth(false), controllers.listAllControler.searchRecipe);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.listAllControler.deleteRecipePage);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.listAllControler.deleteRecipe);

app.get('/recipes/:id/edit', middlewares.auth(), controllers.listAllControler.editRecipe);
app.post('/recipes/:id', middlewares.auth(), controllers.listAllControler.updateRecipe);

app.get('/recipes/:id', middlewares.auth(false), controllers.listAllControler.recipeDetails);

app.get('/me/recipes', middlewares.auth(), controllers.listAllControler.myRecipes);

app.get('/me/edit', middlewares.auth(), controllers.userController.updateUserPage);
app.post('/me/edit', middlewares.auth(), controllers.userController.updateUser);

app.use('*', (_req, res) => res.status(404).json({ message: 'Página não encontrada' }));

app.listen(3000, () => console.log('A mãe tá ON na porta 3000'));

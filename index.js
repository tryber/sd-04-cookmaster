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

app.get('/', middlewares.auth(false), controllers.recipeController.listAllRecipes);

app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.searchRecipe);

app.get('/recipes/new', middlewares.auth(true), controllers.recipeController.newRecipe);
app.post('/recipes/new', middlewares.auth(true), controllers.recipeController.addRecipe);

app.get('/me/recipes', middlewares.auth());

app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.listAllRecipes);
// app.put('/recipes/:id', authMiddleware.auth());

app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.renderRemoveRecipe);
app.delete('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.removeRecipe);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.recipeDetails);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/cadastro', controllers.userFormController.userForm);
app.post('/cadastro', controllers.userFormController.newUser);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.use('*', (_req, res) => res.status(404).json({ message: 'Página não encontrada' }));

app.listen(3000, () => console.log('Running server on port 3000'));

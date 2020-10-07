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

// recipes router
app.get('/recipes/new', middlewares.auth(false), controllers.recipesController.newRecipe);

app.post('/recipes/', middlewares.auth(false), controllers.recipesController.create);
app.get('/recipes/', middlewares.auth(false), controllers.recipesController.showAllRecipes);

app.get('/recipes/search', middlewares.auth(false), controllers.recipesController.buscaReceita);

app.get('/', middlewares.auth(false), controllers.recipesController.showAllRecipes);
app.get('/recipes/:id/edit', middlewares.auth(false), controllers.recipesController.editRecipe);
app.post(
  '/recipes/:id/delete',
  middlewares.auth(false),
  controllers.recipesController.deleteRecipe,
);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.showRecipe);

// user router
app.get('/cadastro', controllers.userController.cadastrar);
app.post('/cadastro', controllers.userController.newUser);
app.get('/me/recipes', middlewares.auth(), controllers.recipesController.showUserRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));

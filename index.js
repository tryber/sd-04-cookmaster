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

app.get('/', middlewares.auth(false), controllers.recipesController.getAllRecipes);

app.get('/admin', middlewares.auth(), (req, res) => res.render('admin/home', { user: req.user }));

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/cadastro', (_req, res) => res.render('cadastro', { message: null }));
app.post('/cadastro', controllers.registerUserController);

app.get('/recipes/new', middlewares.auth(), (_req, res) => res.render('admin/newRecipe'));
app.post('/recipes', middlewares.auth(), controllers.recipesController.createRecipe);

app.get('/recipes/search', controllers.recipesController.searchRecipe);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.getRecipe);
app.get('/recipes/:id/delete', middlewares.auth(), (req, res) => res.render('admin/confirmPassword', { id: req.params.id, message: '' }));
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipesController.deleteRecipe);

app.get('/me/recipes', middlewares.auth(), controllers.recipesController.getUserRecipe);

app.listen(3000, () => console.log('Listening on 3000'));

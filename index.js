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

app.get('/', controllers.recipeController.index);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/cadastro', (_req, res) => res.render('cadastro', { message: null }));
app.post('/cadastro', controllers.signUpController);

app.get('/recipes/search', controllers.recipeController.searchRecipe);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.findRecipeDetails);
app.listen(3000, () => console.log('Listening on 3000'));

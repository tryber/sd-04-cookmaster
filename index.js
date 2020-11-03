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

// Rota de "/"
app.get('/', middlewares.auth(false), controllers.recipeControler.showRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

// Rota de Busca de Receitas
app.get('/recipes/search', controllers.recipeControler.searchRecipesController);
app.get('/recipes/search', middlewares.auth(false), (req, res) => {
  return res.render('searchRecipes', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));

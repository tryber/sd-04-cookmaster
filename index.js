const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const RecipesController = require('./controllers/recipesController');
const UserController = require('./controllers/userController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

// -------------------------------------------------

// home com todas as receitas
app.get('/', RecipesController.recipeController);

// página de cadastro
app.get('/cadastro', UserController.newUser);
app.post('/cadastro', UserController.newUser);

// página para cada receita específica
app.get('/recipes/:id', (_req, res) => {
  res.send('nome da receita pipipipopopo');
});

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Ouvindo na 3000'));

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
app.get('/', middlewares.auth(false), controllers.recipeController.showRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

// Rota de cadastro de novo usuário
app.get('/register', controllers.userController.registerUser);
app.post('/register', controllers.userController.registerUserValid);

// Rotas de login e logout
app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

// Rota de "Minhas Receitas" - Disponível apenas para pessoas logadas
app.get('/me/recipes', middlewares.auth(true));


// Rota de Busca de Receitas
app.get('/recipes/search', controllers.recipeController.searchRecipesController);
app.get('/recipes/search', middlewares.auth(false), (req, res) => {
  return res.render('searchRecipes', { user: req.user });
});

// Rota de cadastro de nova receita
app.get('/recipes/new', middlewares.auth(false), controllers.recipeController.newRecipePage);
app.post('/recipes', middlewares.auth(true), controllers.recipeController.createRecipeController);

// Rotas de ver receita detalhada, editar e deletar
app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.openRecipesController);
// app.get('/recipes/:id/delete');

app.listen(3000, () => console.log('Listening on 3000'));

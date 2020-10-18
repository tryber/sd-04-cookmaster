const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');
const recipeController = require('./controllers/recipeController');
const userController = require('./controllers/userController');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), recipeController.listRecipes);

// Renderiza o formulário de cadastro
app.get('/register', userController.formRegister);
// Rota com os dados do formulário para cadastro
app.post('/registerUser', userController.userRegister);

// Renderiza formulário nova receita
app.get('/recipes/new', middlewares.auth(true), recipeController.recipesForm);
app.post('/recipes', middlewares.auth(true), recipeController.addRecipes);

// Busca receita
app.get('/recipes/search', middlewares.auth(false), recipeController.findRecipes);

// Renderiza minhas receitas
app.get('/me/recipes', middlewares.auth(true), userController.recipesAllUser);

// Renderiza receitas pelo usuario Id
app.get('/recipes/:id', middlewares.auth(false), userController.recipesUser);

// Renderiza pagaina editar receitas
app.get('/edit', (req, res) => {
  return res.render('users/recipesEdit');
});

// Renderiza pagina remove receitas
app.get('/remove', (req, res) => {
  return res.render('users/recipesRemove');
});

app.get('/admin', middlewares.auth(true), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));

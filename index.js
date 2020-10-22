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

app.get('/admin', middlewares.auth(true), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

// Renderiza o formulário de cadastro
app.get('/register', userController.formRegister);
// Rota com os dados do formulário para cadastro
app.post('/registerUser', userController.userRegister);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

// Busca receita
app.get('/recipes/search', middlewares.auth(false), recipeController.findRecipes);

// Renderiza pagina remove receitas
app.get('/recipes/:id/delete', middlewares.auth(true), recipeController.formDelete);
// delete POST
app.post('/recipes/:id/delete', middlewares.auth(true), recipeController.recipesDelete);

// Renderiza formulário nova receita
app.get('/recipes/new', middlewares.auth(true), recipeController.recipesForm);
app.post('/recipes', middlewares.auth(true), recipeController.addRecipes);

// Renderiza form recipesEdit
app.get('/recipes/:id/edit', middlewares.auth(true), recipeController.getRecipeById);
// Atualiza recetia
app.post('/recipes/:id', middlewares.auth(true), recipeController.updateRecipes);

// Renderiza receitas pelo usuario Id
app.get('/recipes/:id', middlewares.auth(false), userController.recipesUser);

// Renderiza minhas receitas
app.get('/me/recipes', middlewares.auth(true), userController.recipesAllUser);

// Renderiza form userEdit
app.get('/me/edit', middlewares.auth(true), userController.userEdit);
// Atualiza usuário
app.post('/me/edit', middlewares.auth(true), userController.userUpdate);

// Porta
app.listen(3000, () => console.log('Listening on 3000'));

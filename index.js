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

// Roda Inicial
app.get('/', middlewares.auth(false), controllers.cookmasterControl.index);

// Rotas de Admin
app.get('/admin', middlewares.auth(), (req, res) => res.render('admin/home', { user: req.user }));

// Rotas para Cadastro
app.get('/cadastro', middlewares.auth(false), controllers.cookmasterControl.cadastroForm);
app.post('/cadastro', middlewares.auth(false), controllers.cookmasterControl.cadastro);

// Rotas para Login
app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

// Rota Buscar Receita
app.get('/recipes/search', middlewares.auth(false), controllers.cookmasterControl.search);

// Deletar uma Receita
app.get('/recipes/:id/delete', middlewares.auth(true), controllers.cookmasterControl.deleteRecipe);
app.post('/recipes/:id/delete', middlewares.auth(true), controllers.cookmasterControl.delPost);

// Rota Nova Receita
app.get('/recipes/new', middlewares.auth(true), controllers.cookmasterControl.newRecipe);
app.post('/recipes', middlewares.auth(true), controllers.cookmasterControl.postNewRecipe);

// Rotas para editar Receita
app.get('/recipes/:id/edit', middlewares.auth(true), controllers.cookmasterControl.edit);
app.post('/recipes/:id/', middlewares.auth(true), controllers.cookmasterControl.editPost);

// Rotas para Receita Detail
app.get('/recipes/:id', middlewares.auth(false), controllers.cookmasterControl.recipeDetails);

// Minha Receitas
app.get('/me/recipes', middlewares.auth(true), controllers.cookmasterControl.myRecipe);

// APP LISTEN
app.listen(3000, () => console.log('Listening on 3000'));

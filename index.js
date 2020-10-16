const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');
// const auth = require('./middlewares/auth');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.homeController.indexHome);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

// /registrar renderiza a tela de cadastro e /cadastrar faz as operacoes de cadastro
app.get('/registrar', (req, res) => {
  const erroData = null;
  return res.render('cadastro', { erroData });
});
app.post('/cadastrar', controllers.userController.cadastrar);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.buscar);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deletarGet);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deletar);

app.get('/recipes/new', middlewares.auth(), controllers.recipeController.novaReceita);
app.post('/recipes', middlewares.auth(), controllers.recipeController.cadastrarReceita);

app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.editar);
app.post('/recipes/:id/', middlewares.auth(), controllers.recipeController.atualizarReceita);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.index);

app.get('/me/recipes', middlewares.auth(), controllers.recipeController.minhas);

app.get('/me/edit', middlewares.auth(), controllers.userController.editarUsuario);
app.post('/me/edit', middlewares.auth(), controllers.userController.editarUsuarioPost);

app.listen(3000, () => console.log('Listening on 3000'));

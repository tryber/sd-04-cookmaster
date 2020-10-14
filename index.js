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

app.get('/', middlewares.auth(false), controllers.homeController.indexHome);
// /registrar renderiza a tela de cadastro e /cadastrar faz as operacoes de cadastro
app.get('/registrar', (req, res) => {
  const erroData = null;
  return res.render('cadastro', { erroData });
});
app.post('/cadastrar', controllers.userController.cadastrar);
app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.buscar);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/recipes/:id/edit', (req, res) => {
  return res.render('edit');
});

app.get('/recipes/:id/delete', (req, res) => {
  return res.render('edit');
});
app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.index);

app.listen(3000, () => console.log('Listening on 3000'));

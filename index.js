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

app.use(express.json());
// app.get('/', async (_req, res) => {
//   await recipeModel.getAllRecipes().then((hey)=> console.log(hey));
//   return res.render('home');
// });

app.use(express.static('./public'));
app.get('/', middlewares.auth(false), controllers.recipeController.listRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.search);

app.get('/cadastro', controllers.cadastroController.cadastroForm);
app.post('/cadastro', controllers.cadastroController.entrar);

app.get('/recipes/new', middlewares.auth(false), controllers.recipeController.cadastroRecipe);
app.post('/recipes', middlewares.auth(false), controllers.recipeController.registerRecipe);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.recipeById);

app.get('/recipes/:id/edit', middlewares.auth(false), controllers.recipeController.editRecipe);
app.post('/recipes/:id', middlewares.auth(true), controllers.recipeController.updateRecipe);

app.get('/recipes/:id/delete', middlewares.auth(true), controllers.recipeController.deleteRecipe);
app.post('/recipes/:id/delete', middlewares.auth(true), controllers.recipeController.deletarRecipe);

app.get('/me/recipes', middlewares.auth(true), controllers.recipeController.recipeByUserId);

app.listen(3000, () => console.log('Listening on 3000'));

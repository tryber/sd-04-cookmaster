const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const RecipesController = require('./controllers/recipesController');
const UserController = require('./controllers/userController');

const app = express();

const recipeRouter = express.Router();
const meRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/recipes/', recipeRouter);
app.use('/me/', meRouter);

// -------------------------------------------------

// home OK ---------------------------------------------------------------
app.get('/', RecipesController.recipeController);

// página de cadastro OK -------------------------------------------------
app.get('/cadastro', UserController.newUser);
app.post('/cadastro', UserController.newUser);

// página para criar receita ---------------------------------------------
recipeRouter.get('/new', (req, res) => {
  res.send('criar receita');
});

// página para buscar receitas OK ----------------------------------------
recipeRouter.get('/search', RecipesController.searchRecipeController);

// página de detalhes da receita OK --------------------------------------
recipeRouter.get('/:id', RecipesController.recipeDetailsController);

// páginas excluir e editar (ainda nao implementadas) --------------------
app.get('/recipes/:id/edit', (_req, res) => {
  res.send('página para editar receita');
});
app.get('/recipes/:id/delete', (_req, res) => {
  res.send('página para excluir receita');
});

// página de minhas receitas (ainda nao implementada) --------------------
meRouter.get('/recipes', (_req, res) => {
  res.send('Minhas Receitas');
});

// página editar conta (ainda nao implementada) ---------------------------
meRouter.get('/edit', (_req, res) => {
  res.send('Minha Conta');
});

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Ouvindo na 3000'));

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');

const recipeController = require('./controllers/recipeController');
const userController = require('./controllers/userController');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public/`));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/', middlewares.auth(false), recipeController.home);

app.get('/login', userController.loginForm);
app.get('/logout', userController.logout);
app.post('/login', userController.login);

app.get('/cadastro', userController.cadastro);
app.post('/cadastro', userController.add);

app.get('/details/:id', middlewares.auth(false), recipeController.detailsRecipe);
app.get('/recipes/search', middlewares.auth(), recipeController.buscarRecipe);

app.get('/recipes/new', middlewares.auth(), recipeController.adicionar);
app.post('/recipes', middlewares.auth(), recipeController.adicionarRecipe);

app.post('/recipes/:id', middlewares.auth(), recipeController.updateCommit);
app.get('/recipes/:id/edit', middlewares.auth(), recipeController.update);

// app.get('/me/recipes', middlewares.auth(), recipeController.minhasReceitas);

app.listen(3000, () => console.log('Listening on 3000'));

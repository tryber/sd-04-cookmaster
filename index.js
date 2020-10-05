const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');
const { authMiddleware } = require('./middlewares/auth');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipesController.recipeList);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/cadastro', controllers.cadastroController.cadastroForm);
// app.post(
//   '/cadastro',
//   controllers.cadastroController.signup
// );

app.get('recipes/new', authMiddleware(false), controllers.editController.editRecipe);

app.get('/recipes/search', middlewares.auth(false), controllers.searchController.searchRecipe);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.showDetails);

app.listen(3000, () => console.log('Listening on 3000'));

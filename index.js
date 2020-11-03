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

app.get('/', middlewares.auth(false), controllers.recipeController.listarReceitas);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/recipes/newRecipe', middlewares.auth(), controllers.recipeController.recipeRegister);
app.post('/recipes', middlewares.auth(false), controllers.recipeController.newRecipe);
app.get('/recipes', middlewares.auth(false), controllers.recipeController.listarReceitas);

app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.searchRecipes);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.viewRecipesUser);
app.get('/recipes/:id', middlewares.auth(), controllers.recipeController.viewRecipesUser);

app.get('/register', controllers.cadastroController.signUp);
app.post('/register', controllers.cadastroController.newUser);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));

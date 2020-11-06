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

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/', middlewares.auth(false), controllers.recipeController.getAllRecipes);
app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);
app.get('/signup', controllers.signupController.signup);
app.post('/signup', controllers.signupController.createNewUser);
app.get('/recipes/search/', middlewares.auth(false), controllers.recipeController.searchPage);
app.get('/recipes/new/', middlewares.auth(false), controllers.recipeController.newRecipe);
app.post('/recipes', middlewares.auth(false), controllers.recipeController.postRecipe);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.showMoreInfo);

app.listen(3000, () => console.log('Listening on 3000'));

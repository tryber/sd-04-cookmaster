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

app.get('/', middlewares.auth(false), controllers.recipesController.index);

app.get('/admin', middlewares.auth(), (req, res) => res.render('admin/home', { user: req.user }));

app.get('/recipes/new', middlewares.auth(false), controllers.recipesController.newRecipe);
app.get('/recipes/search', middlewares.auth(false), controllers.recipesController.search);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.show);
app.get('recipes/:id/edit', middlewares.auth(false), controllers.recipesController.edit);

app.get('/signup', controllers.userController.renderSignup);
app.post('/signup', middlewares.validation, controllers.userController.signUp);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));

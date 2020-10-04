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

app.get('/admin', middlewares.auth(), (req, res) => res.render('admin/home', { user: req.userData }));

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.use(middlewares.auth(false));

app.get('/', controllers.recipesController.homeRecipes);
app.get('/recipes/:id', controllers.recipesController.oneRecipe);

app.listen(3000, () => console.log('Listening on 3000'));

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const middlewares = require('./middlewares');
const { userController, recipesController } = require('./controllers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/admin', middlewares.auth(), (req, res) => res.render('admin/home', { user: req.userData }));
app.get('/recipes/:id/edit', middlewares.auth(), recipesController.editRecipe);
app.post('/recipes/:id', middlewares.auth(), recipesController.postRecipe);

app.get('/login', userController.loginForm);
app.get('/logout', userController.logout);
app.get('/register', userController.register);
app.post('/login', userController.login);

app.use(middlewares.auth(false));

app.get('/', recipesController.homeRecipes);
app.get('/recipes/:id', recipesController.oneRecipe);

app.listen(3000, () => console.log('Listening on 3000'));

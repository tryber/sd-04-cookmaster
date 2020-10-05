const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const middlewares = require('./middlewares');
const controllers = require('./controllers');
const userController = require('./controllers/userController');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipesController.listAllRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/register', (_req, res) => {
  res.render('registerUser', { message: null });
});

app.post('/register', middlewares.validatedRegister, userController.registerUser);

app.get(
  '/recipes/search',
  middlewares.auth(false),
  controllers.recipesController.searchByNameController,
);

app.get(
  '/recipes/:id',
  middlewares.auth(false),
  controllers.recipesController.recipeDetailsController,
);

app.listen(3000, () => console.log('Listening on 3000'));

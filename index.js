const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');
const userController = require('./controllers/userController');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', middlewares.auth(false), controllers.recipeController.listRecipes);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.recipeDetail);

app.get('/newUser', controllers.userController.newUser);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
}); // colocar esse middleware no controller

app.get('/recipeDetail', middlewares.auth(false), controllers.recipeController.listRecipes);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', middlewares.auth(false), controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));

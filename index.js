const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipesController.allRecipes);

app.get('/admin', middlewares.auth(), (req, res) => res.render('admin/home', { user: req.user }));

app.get('/login', controllers.userController.loginForm);
app.post('/signup', controllers.userController.signup);
app.get('/signup', controllers.userController.signupForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('*', (_req, res) => {
  res.status(404);
  res.render('notFound');
});

app.listen(3000);

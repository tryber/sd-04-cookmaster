const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');
// const routes = require('./routes');

const recipeRoutes = require('./routes/recipe');
const userRoutes = require('./routes/user');
const sessionRoutes = require('./routes/session');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

/** Login routes */
app.use('/', sessionRoutes);
/** User routes */
app.use('/', userRoutes);
/** Recipes routes */
app.use('/', recipeRoutes);

app.get('/admin', middlewares.auth(), (req, res) => res.render('admin/home', { user: req.user }));

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000);

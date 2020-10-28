const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const middlewares = require('./middlewares');
const controllers = require('./controllers');

const cssDirectoryPath = path.join(__dirname, './styles');
const cssDirectory = express.static(cssDirectoryPath);
const scriptsDirectoryPath = path.join(__dirname, './scripts');
const scriptsDirectory = express.static(scriptsDirectoryPath);

const app = express();

app.use('/styles', cssDirectory);
app.use('/scripts', scriptsDirectory);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipesController.showAll);
app.get('/recipes/search', middlewares.auth(false), controllers.recipesController.search);
app.get('/recipes/new', middlewares.auth(), (req, res) => res.render('recipes/add', { user: req.user }));
app.post('/recipes', middlewares.auth(false), controllers.recipesController.add);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.showOne);

app.get('/cadastrar', controllers.userController.show);
app.post('/cadastrar', controllers.userController.add);
app.get('/me/edit', middlewares.auth(), controllers.userController.edit);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000);

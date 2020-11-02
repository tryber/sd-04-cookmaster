const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const middlewares = require('./middlewares');
const controllers = require('./controllers');

const cssDirectoryPath = path.join(__dirname, '/styles');
const cssDirectory = express.static(cssDirectoryPath);
const scriptsDirectoryPath = path.join(__dirname, '/scripts');
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
app.get('/recipes/new', middlewares.auth(), controllers.recipesController.addForm);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.showOne);
app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipesController.editForm);
app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipesController.delForm);

app.post('/recipes', middlewares.auth(false), controllers.recipesController.add);
app.post('/recipes/:id', middlewares.auth(), controllers.recipesController.edit);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipesController.del);

app.get('/cadastrar', controllers.userController.addForm);
app.get('/me/edit', middlewares.auth(), controllers.userController.editForm);
app.get('/me/recipes', middlewares.auth(), controllers.recipesController.userRecipes);

app.post('/cadastrar', middlewares.userValidation, controllers.userController.add);
app.post('/me/edit', middlewares.auth(false), middlewares.userValidation, controllers.userController.edit);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);

app.post('/login', controllers.userController.login);

app.listen(3000);

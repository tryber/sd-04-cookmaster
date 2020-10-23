const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// Initial commit
const middlewares = require('./middlewares');
const controllers = require('./controllers');

const publicDirectoryPath = path.join(__dirname, './public');
const cssDirectoryPath = path.join(__dirname, './styles');
const staticDirectory = express.static(publicDirectoryPath);
const cssDirectory = express.static(cssDirectoryPath);

const app = express();
app.use(staticDirectory);
app.use('/styles', cssDirectory);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipesController.showAll);

app.get('/cadastrar', controllers.userController.show);
app.post('/cadastrar', controllers.userController.add);
app.get('/me/edit', middlewares.auth(), controllers.userController.edit);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000);

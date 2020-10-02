const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');
// const connection = require('./models/connection');
// const userModel = require('./models/userModel');

// connection();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', controllers.homeController.home);

app.get('/admin', middlewares.auth(), controllers.userController.admin);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/signUp', controllers.signUpController.signUpForm);
app.post('/signUp', controllers.signUpController.signUp);

app.get('/recipes/:id', controllers.recipeController.recipe);

app.listen(3000, () => console.log('Listening on http://localhost:3000'));

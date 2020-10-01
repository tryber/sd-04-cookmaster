const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userModel = require('./models/userModel');

const middlewares = require('./middlewares');
const controllers = require('./controllers');
const recipeController = require('./controllers/recipesController');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('./style'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', recipeController.listRecipes);

// app.get('/', (_req, res) => {
//   return res.render('home');
// });

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));

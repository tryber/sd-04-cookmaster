const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipeController.allRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', middlewares.auth(false), controllers.userController.login);

app.get('/recipes/new', middlewares.auth(), controllers.recipeController.addNewRecipe);
app.post('/recipes', middlewares.auth(), controllers.recipeController.createRecipe);

app.get('/recipes/search', controllers.recipeController.searchRecipe);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.userRecipe);

app.get('/register', controllers.userController.renderUser);
app.post('/register', middlewares.userAuth.validation, controllers.userController.newUser);

app.get('/recipeDetail', middlewares.auth(false), controllers.recipeController.listRecipes);



app.listen(3000, () => console.log('Listening on 3000'));

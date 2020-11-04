const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const { userController, recipesController, registerController } = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', recipesController.recipesCtrl);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/me/edit', middlewares.auth(), userController.updateUserForm);
app.post('/me/edit', middlewares.auth(false), userController.updateUser);

app.get('/me/recipes', middlewares.auth(), recipesController.myRecipes);

app.get('/recipes/new', middlewares.auth(false), recipesController.newRecipeForm);
app.post('/recipes/new', middlewares.auth(false), recipesController.newRecipe);

app.get('/recipes/search', middlewares.auth(false), recipesController.recipesSearch);

app.get('/recipes/:id/delete', middlewares.auth(), recipesController.deleteRecipeForm);
app.post('/recipes/:id/delete', middlewares.auth(), recipesController.delRecipe);

app.get('/recipes/:id/edit', middlewares.auth(), recipesController.editRecipeForm);
app.post('/recipes/:id', middlewares.auth(), recipesController.editRecipe);

app.get('/recipes/:id', middlewares.auth(false), recipesController.recipesDtls);

app.get('/register', registerController.registerForm);
app.post('/register', registerController.register);

app.get('/login', userController.loginForm);
app.get('/logout', userController.logout);
app.post('/login', userController.login);

app.listen(3000, () => console.log('Listening on 3000'));

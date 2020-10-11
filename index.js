const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipeController.listRecipes);
app.get('/cadastro', middlewares.auth(false), (_req, res) => {
  return res.render('cadastro');
});

app.get(
  '/recipes',
  middlewares.auth(),
  controllers.recipeController.myRecipesList,
);

app.get(
  '/recipes/search',
  middlewares.auth(false),
  controllers.recipeController.searchRecipes,
);

app.get(
  '/recipes/new',
  middlewares.auth(),
  controllers.recipeController.newRecipeRender,
);

app.get(
  '/recipes/:id',
  middlewares.auth(false),
  controllers.recipeController.showRecipeById,
);

app.get(
  '/recipes/:id/edit',
  middlewares.auth(),
  controllers.recipeController.editRecipe,
);

app.get(
  '/recipes/:id/delete',
  middlewares.auth(),
  controllers.recipeController.deleteRecipe,
);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.post('/cadastro', controllers.userController.createUser);

app.post(
  '/recipes',
  middlewares.auth(),
  controllers.recipeController.addAndReturnToHome,
);

app.post(
  '/recipes/:id/delete',
  middlewares.auth(),
  controllers.recipeController.executeDeleteRecipe,
);

app.post(
  '/recipes/:id',
  middlewares.auth(),
  controllers.recipeController.modifyRecipe,
);

app.listen(3000, () => console.log('Listening on 3000'));

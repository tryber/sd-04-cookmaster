const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const RecipesController = require('./controllers/recipesController');
const UserController = require('./controllers/userController');
const { authMiddleware } = require('./middlewares/auth');

const app = express();

const recipeRouter = express.Router();
const meRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/recipes', recipeRouter);
app.use('/me/', meRouter);

// -------------------------------------------------

// home  ---------------------------------------------------------------
app.get('/', RecipesController.allRecipesController);

// página de cadastro de usuário ------------------------------------
app.get('/cadastro', UserController.createUserController);
app.post('/cadastro', UserController.createUserController);

// página para buscar receitas  -------------------------------------
recipeRouter.get('/search', middlewares.auth(false), RecipesController.searchRecipesController);

// página para criar receita  ---------------------------------------
recipeRouter.get('/new', middlewares.auth(), RecipesController.showRecipeCreateForm);
recipeRouter.post('/', middlewares.auth(), RecipesController.postNewRecipeController);

// página para exclusão de receita -------------------------------------
recipeRouter.get('/:id/delete', middlewares.auth(), RecipesController.deleteRecipeController);
recipeRouter.post('/:id/delete', middlewares.auth(), RecipesController.confirmDeleteController);
// recipeRouter.get('/:d/delete', middlewares.auth(), (req, res) => {
//   res.send('deletar receita');
// })

// página de detalhes da receita  -----------------------------------
recipeRouter.get('/:id', middlewares.auth(false), RecipesController.recipeByIdController);

// página de minhas receitas -------------------------------------------
meRouter.get('/recipes', middlewares.auth(), RecipesController.userRecipesController);

// página de editar usuário --------------------------------------------
meRouter.get('/edit', middlewares.auth(), UserController.showEditUserForm);
app.post('/', middlewares.auth(), UserController.editUserController);


// -------------------------------------------------

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Ouvindo na 3000'));

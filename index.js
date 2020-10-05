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

app.get('/', middlewares.auth(false), controllers.recipesController.listRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/signup', (_req, res) => {
  return res.render('signup', { message: null });
});
app.post(
  '/signup',
  controllers.signupController.checkEmail,
  controllers.signupController.checkPassword,
  controllers.signupController.checkConfirmPassword,
  controllers.signupController.checkFirstName,
  controllers.signupController.checkLastName,
  controllers.signupController.signup,
);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.details);

app.get('/edit', controllers.recipesController.editRecipe);

app.get('/delete', controllers.recipesController.deleteRecipe);

app.listen(3000, () => console.log('Listening on 3000'));

// Testando a conexão com o banco

// const connection = require('./models/connection');

// connection().then((_session) => {
//   console.log('Conectado ao MySQL!');
// });

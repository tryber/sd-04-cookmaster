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

//recipes router
app.get('/', middlewares.auth(false), controllers.recipesController.showAllRecipes);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.showRecipe);
app.post('/recipes/:id/edit', middlewares.auth(false), controllers.recipesController.editRecipe);
app.post('/recipes/:id/delete', middlewares.auth(false), controllers.recipesController.deleteRecipe);


//user router
app.get('/cadastro', controllers.userController.cadastrar);
app.post('/cadastro', controllers.userController.newUser);



app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));

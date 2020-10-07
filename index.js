const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');

const recipeControlle = require('./controllers/recipeController');
const userController = require('./controllers/userController');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/', middlewares.auth(false), recipeControlle.index);

app.get('/login', userController.loginForm);
app.get('/logout', userController.logout);
app.post('/login', userController.login);

app.get('/cadastro', userController.cadastro);
app.post('/cadastro', userController.add);

app.listen(3000, () => console.log('Listening on 3000'));

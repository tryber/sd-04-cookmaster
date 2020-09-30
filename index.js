const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const { recipesController, userController } = require('./controllers');
const { loginForm, logout, login } = userController;
const { home } = recipesController;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', home);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', loginForm);
app.get('/logout', logout);
app.post('/login', login);

app.listen(3000, () => console.log('Listening on 3000'));

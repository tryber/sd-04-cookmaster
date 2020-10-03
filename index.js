const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');
const connection = require('./models/connection');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', async (_req, res) => {
  try{
    const db = await connection();
    const results = await db.getTable('recipes').select(['name', 'user']).execute();
    const recipes = results.fetchAll();
    console.log(recipes);
    return res.render('home');
  } catch (err) {
    console.error(err);
    res.status(500).send('<h2>Erro ao tentar realizar a operação</h2>')
  }
});

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));

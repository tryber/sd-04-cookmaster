const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routes = require('./router');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', routes.homeRouter);
app.use('/me', routes.myRouter);
app.use('/recipes', routes.recipeRouter);

app.listen(3000, () => console.log('Listening on 3000'));

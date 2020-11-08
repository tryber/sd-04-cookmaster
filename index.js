const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const indexRoute = require('./routes/index.routes');
const meRoute = require('./routes/me.routes');
const recipesRoute = require('./routes/recipes.routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));

app.use('/', indexRoute);
app.use('/me', meRoute);
app.use('/recipes', recipesRoute);

app.listen(3000, () => console.log('Server is running on 3000'));

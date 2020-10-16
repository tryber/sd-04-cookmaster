
// Projeto realizado em pair programming com Diego Campos e ajuda do Orlando Messias e do Ronan
// Arquitetura baseada no curso de nodejs do balta.io


const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));

// Carregando rotas
const indexRoute = require("./routes/index-route");
const meRoute = require("./routes/me-route");
const recipesRoute = require("./routes/recipes-route");

app.use("/", indexRoute);
app.use("/me", meRoute);
app.use("/recipes", recipesRoute);

app.listen(3000, () => console.log('Server is running on 3000'));

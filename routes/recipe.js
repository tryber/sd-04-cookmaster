const express = require('express');

const router = express.Router();
const middlewares = require('../middlewares')
const recipeController = require('../controllers/recipe');

router.get('/', middlewares.auth(false), recipeController.getRecipes);

module.exports = router;

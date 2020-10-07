const express = require('express');

const router = express.Router();
const middlewares = require('../middlewares');
const controllers = require('../controllers');

// const recipeController = require('../controllers/recipe');

router.get('/', middlewares.auth(false), controllers.recipeController.getRecipes);

router.get('/recipe/:id', middlewares.auth(false), controllers.recipeController.getRecipe);

router.get('/recipe/search', controllers.recipeController.getRecipe);

module.exports = router;

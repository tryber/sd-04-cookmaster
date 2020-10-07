const express = require('express');

const router = express.Router();
const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get('/recipe/search', controllers.recipeController.searchForm);

router.get('/recipe/:id', middlewares.auth(false), controllers.recipeController.getRecipe);

router.get('/', middlewares.auth(false), controllers.recipeController.getRecipes);

module.exports = router;

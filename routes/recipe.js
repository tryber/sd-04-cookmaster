const express = require('express');

const router = express.Router();
const middlewares = require('../middlewares');
const controllers = require('../controllers');

/** Recipe search */
router.get('/recipes/search', middlewares.auth(false), controllers.recipeController.searchRecipe);
/** Recipe details */
router.get('/recipe/:id', middlewares.auth(false), controllers.recipeController.getRecipe);
/** New recipe */
router.get('/recipe/new', middlewares.auth(false), controllers.recipeController.createRecipe);
router.post('/recipe', middlewares.auth(true), controllers.recipeController.createRecipe);
/** Recipes home */
router.get('/', middlewares.auth(false), controllers.recipeController.getRecipes);

module.exports = router;

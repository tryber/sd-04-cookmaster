const express = require('express');

const router = express.Router();
const middlewares = require('../middlewares');
const controllers = require('../controllers');

/** New recipe */
router.get('/recipes/new', middlewares.auth(), controllers.recipeController.createRecipe);
router.post('/recipes', middlewares.auth(), controllers.recipeController.createRecipe);
/** Recipe search */
router.get('/recipes/search', middlewares.auth(false), controllers.recipeController.searchRecipe);
/** Recipe details */
router.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.getRecipe);
/** Recipe update */
router.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.updateRecipe);
router.post('/recipes/:id', middlewares.auth(), controllers.recipeController.updateRecipe);
/** Recipe exclusion */
router.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteRecipe);
router.post('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteRecipe);
/** Recipes home */
router.get('/', middlewares.auth(false), controllers.recipeController.getRecipes);

module.exports = router;

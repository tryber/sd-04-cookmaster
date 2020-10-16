const express = require('express');

const router = express.Router();
const recipeController = require('../controllers/recipeController');
const middlewares = require('../middlewares');

router.post('/', middlewares.auth(false), recipeController.addRecipe);
router.get('/search', middlewares.auth(false), recipeController.searchRecipes);
router.get('/new', middlewares.auth(false), recipeController.newRecipe);
router.get('/:id', middlewares.auth(false), recipeController.recipeDetails);
router.post('/:id', middlewares.auth(false), recipeController.updateRecipe);
router.get('/:id/delete', middlewares.auth(false), recipeController.deleteForm);
router.post('/:id/delete', middlewares.auth(false), recipeController.deleteRecipe);
router.get('/:id/edit', middlewares.auth(false), recipeController.editRecipe);

module.exports = router;

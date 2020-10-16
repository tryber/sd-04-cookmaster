const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/signUpController');
const recipeController = require('../controllers/recipeController');
const middlewares = require('../middlewares');

router.post('/', middlewares.auth(true), signUpController.editUser);
router.get('/edit', middlewares.auth(true), signUpController.renderEditUser);
router.get('/recipes', middlewares.auth(true), recipeController.myRecipes);

module.exports = router;

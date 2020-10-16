/** USER ROUTES */

const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get('/me/recipes', middlewares.auth(), controllers.userController.getUserRecipes);

module.exports = router;

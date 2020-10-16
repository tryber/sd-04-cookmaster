/** USER ROUTES */

const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get('/me/recipes', middlewares.auth(), controllers.userController.getUserRecipes);

router.get('/me/edit', middlewares.auth(), controllers.userController.updateProfile);
router.post(
  '/me/edit',
  middlewares.auth(),
  middlewares.validate.userDataRules(),
  middlewares.validate.userDataUpdate,
  controllers.userController.updateProfile,
);

module.exports = router;

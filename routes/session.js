const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get('/signup', controllers.sessionController.signupForm);

router.post(
  '/signup',
  middlewares.validate.userDataRules(),
  middlewares.validate.userData,
  controllers.sessionController.signup,
);

module.exports = router;

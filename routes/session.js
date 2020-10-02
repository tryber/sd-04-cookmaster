const express = require('express');

const router = express.Router();
const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get('/signup', controllers.sessionController.signupForm);

router.post('/signup', controllers.sessionController.signup);

module.exports = router;

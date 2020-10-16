const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const userController = require('../controllers/userController');
const signUpController = require('../controllers/signUpController');
const middlewares = require('../middlewares');

router.get('/', middlewares.auth(false), recipeController.listRecipes);
router.get('/admin', middlewares.auth(), (req, res) =>
  res.render('admin/home', { user: req.user })
);

router.get('/login', userController.loginForm);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/signup', signUpController.renderSignup);
router.post('/signup', signUpController.newUser);

module.exports = router;

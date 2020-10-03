const { Router } = require('express');
const controllers = require('../controllers');

const recipeRouter = Router();

recipeRouter.get('/:id');

module.exports = recipeRouter;

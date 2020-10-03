const { Router } = require('express');
const controllers = require('../controllers');

const recipeRouter = Router();

recipeRouter.get('/:id', (req, res) => {
  const { id } = req.params;
});

module.exports = recipeRouter;

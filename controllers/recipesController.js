const recipesModel = require('../models/recipesModel');

const recipesController = async (req, res) => {
  const recipes = await recipesModel();
  return res.render('home', { recipes, user: req.user });
};

module.exports = recipesController;

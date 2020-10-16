const recipesModel = require('../models/recipesModel');


const index = async (req, res) => {
  const recipes = await recipesModel.getAll();

  res.render('home', { recipes, user: req.user });
};

const show = async (req, res) => {
  const recipes = await recipesModel.getById(req.params.id);

  res.render('recipes/details', { recipes, user: req.user });
};

module.exports = {
  index,
  show,
};

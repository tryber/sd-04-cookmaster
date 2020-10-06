const recipeModel = require('../models/recipeModel');

const show = async (req, res) => {
  const recipes = await recipeModel.getAll();
  res.render('home', { recipes, user: req.user });
}

module.exports = {
  show,
}

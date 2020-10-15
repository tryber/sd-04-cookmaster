const recipesModel = require('../models/recipesModel');

const index = async (req, res) => {
  const recipes = await recipesModel.getAll();
  res.render('home', { recipes, user: req.user });
};

module.exports = {
  index,
  // show,
  // userBuildings,
  // add,
  // create
};

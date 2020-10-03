const { getAll } = require('../models/listRecipesModel');

const listRecipes = async (req, res) => {
  const recipes = await getAll();

  res.render('home', { recipes, user: req.user });
};

module.exports = {
  listRecipes,
};

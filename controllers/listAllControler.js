const { getAll } = require('../models/listRecipesModel');

const listRecipes = async (_req, res) => {
  const recipes = await getAll();

  res.render('home', { recipes });
};

module.exports = {
  listRecipes,
};

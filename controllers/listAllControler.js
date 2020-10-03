const { getAll } = require('../models/listRecipesModel');

const listRecipes = async (req, res) => {
  const recipes = await getAll();
  console.log(req.user)
  res.render('home', { recipes, user: req.user });
};

module.exports = {
  listRecipes,
};

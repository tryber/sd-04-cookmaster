const recipesModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipes = await recipesModel.getAllRecipes();
  const { user = null } = req;
  console.log(req.user)
  res.render('home', { recipes, user });
};

module.exports = { listRecipes };

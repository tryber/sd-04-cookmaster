const { recipesModel } = require('../models');

const listAllRecipes = async (req, res) => {
  const getAllRecipes = await recipesModel.getAllRecipes();
  return res.render('home', { getAllRecipes, user: req.user })
}

module.exports = { listAllRecipes };

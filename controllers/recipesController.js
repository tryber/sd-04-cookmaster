const { recipesModel } = require('../models');

const listAllRecipes = async (req, res) => {
  try {
    const getAllRecipes = await recipesModel.getAllRecipes();
    return res.render('home', { getAllRecipes, user: req.user });
  } catch (error) {
    return error;
  }
};

module.exports = { listAllRecipes };

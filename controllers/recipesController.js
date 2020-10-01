const { recipesModel } = require('../models');

const listAllRecipes = async (req, res) => {
  try {
    const getAllRecipes = await recipesModel.getAllRecipes();
    const { token = '' } = req.cookies || {};
    return res.render('home', { getAllRecipes, token });
  } catch (error) {
    return error;
  }
};

module.exports = { listAllRecipes };

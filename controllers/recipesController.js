const recipesModel = require('../models/recipesModel');
// const userModel = require('../models/userModel');

const listAllRecipes = async (req, res) => {
  const recipes = await recipesModel.getAllRecipes();

  try {
    res.status(200).render('home', { recipes, user: req.user });
  } catch (error) {
    res.status(500).send('<p>Desculpe, ocorreu algum erro, tente novamente<p>');
  }
};

module.exports = {
  listAllRecipes,
};

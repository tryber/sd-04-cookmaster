const Recipe = require('../models/recipesModel');

const recipeController = async (req, res) => {
  const recipes = await Recipe.findAll();

  const { token = '' } = req.cookies || {};

  try {
    res.status(200).render('home', { recipes, token });
  } catch (err) {
    res.status(500).send('<h2>Não foi possivel realizar essa operação</h2>');
  }
};

const recipeDetailsController = async (req, res) => {
  const {id} = req.params;

  const recipe = await Recipe.getRecipeById(id);

  const { token = '' } = req.cookies || {};

  try {
    res.status(200).render('recipesDetails', {recipe, token});
  } catch (err) {
    res.status(500).send('<h2>Não foi possivel realizar essa operação</h2>');
  }
}

module.exports = {
  recipeController,
  recipeDetailsController
};

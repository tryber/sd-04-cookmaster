const { getRecipes } = require('../models/getRecipes');


const recipesController = async (_req, res) => {
  const recipes = await getRecipes();

  return res.render('home', { recipes });
};

module.exports = recipesController;

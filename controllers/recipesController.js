const getAllRecipes = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipes = await getAllRecipes();
  try {
    res.status(200).render('home', { recipes, user: req.user });
  } catch (err) {
    res.status(500).send('<h1>Erro ao carregar a home</h1>');
  }
};

module.exports = { listRecipes };

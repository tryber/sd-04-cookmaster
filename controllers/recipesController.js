const getAllRecipes = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipes = await getAllRecipes();
  const { token } = req.cookies;
  try {
    res.status(200).render('home', { recipes, token });
  } catch (err) {
    res.status(500).send('<h1>Erro ao carregar a home</h1>');
  }
};

module.exports = { listRecipes };

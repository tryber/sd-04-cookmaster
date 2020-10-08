const recipeModel = require('../models/recipeModel');

const home = async (req, res) => {
  const recipes = await recipeModel.findAll();

  res.render('home', { recipes, user: req.user });
};

const detailsRecipe = async (req, res) => {
  const { id } = req.params;

  const recipe = await recipeModel.findById(id);

  res.render('recipes/details', { recipe, user: req.user });
};

const buscarRecipe = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    res.render('recipes/buscar', { user: req.user });
  } else {
    recipeModel
      .findByName(q)
      .then((recipe) => res.render('recipes/buscar', { recipe, user: req.user }))
      .catch(() => res.send('Receita não existe'));
  }
};

module.exports = {
  buscarRecipe,
  detailsRecipe,
  home,
};

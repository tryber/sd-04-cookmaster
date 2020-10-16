const recipesModel = require('../models/recipesModel');

const index = async (req, res) => {
  const recipes = await recipesModel.getAll();
  res.render('home', { recipes, message: null, user: req.user });
};

const show = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.getRecipeById(id);
  return res.status(200).render('recipes/details', { recipe, user: req.user });
};

const search = async (req, res) => {
  const { q } = req.query;
  if (!q && q !== '') res.status(200).render('recipes/search', { recipes: null, user: req.user });
  const recipes = await recipesModel.getByName(q);
  return res.status(200).render('recipes/search', { recipes, user: req.user, query: q });
};

const newRecipe = async (req, res) => {
  res.status(201).render('recipes/new', {
    user: req.user,
    nameMessage: null,
    ingredientsMessage: null,
    instructionsMessage: null,
    successMessage: null,
  });
};

module.exports = {
  index,
  show,
  search,
  newRecipe,
};
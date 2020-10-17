const { getAll, getById, getByText } = require('../models/recipeModel');

const showRecipes = async (req, res) => {
  const recipes = await getAll();

  return res.status(200).render('home', { recipes });
};

const showRecipesAdm = async (req, res) => {
  const recipes = await getAll();

  return res.status(200).render('admin/home', { recipes, user: req.user });
};

const showRecipeId = async (req, res) => {
  const { id } = req.params;
  const recipe = await getById(id);
  const { id: lId } = req.user || {};
  const equal = recipe.userId === lId;

  return res.status(200)
    .render('recipeDetail', { recipe, equal });
};

const recipeSearch = async (req, res) => {
  const q = req.query.q || null;
  const recipes = await getByText(q)

  return res.status(200).render('recipeSearch', { recipes });
};

const recipeEdit = (_, res) => {
  res.render('admin/recipeEdit');
};

const recipeDelete = (_, res) => {
  res.render('admin/recipeDelete');
};

module.exports = {
  showRecipes,
  showRecipesAdm,
  showRecipeId,
  recipeEdit,
  recipeDelete,
  recipeSearch,
};

const recipeModel = require('../models/recipeModel');

const showRecipes = async (req, res) => {
  const recipes = await recipeModel.getAll();

  return res.status(200).render('home', { recipes });
};

const showRecipesAdm = async (req, res) => {
  const recipes = await recipeModel.getAll();

  return res.status(200).render('admin/home', { recipes, user: req.user });
};

const showRecipeId = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.getById(id);
  const { id: lId } = req.user || {};
  const equal = recipe.userId === lId;

  return res.status(200).render('recipeDetail', { recipe, equal });
};

const recipeSearch = async (req, res) => {
  const q = req.query.q || null;
  const recipes = await recipeModel.getByName(q);

  return res.status(200).render('recipeSearch', { recipes });
};

const recipeForm = (_, res) => res.status(200).render('recipeNew', { message: null });

const addRecipe = async (req, res) => {
  const { id, firstName } = req.user;
  const { name, ingredients, instructions } = req.body;
  const recipe = { id, firstName, name, ingredients, instructions };
  const recipes = await recipeModel.getAll();

  recipeModel.createRecipe(recipe);

  return res.status(200).render('admin/home', { user: req.user, recipes });
};

const recipeEdit = (_, res) => res.render('admin/recipeEdit');

const recipeDelete = (_, res) => res.render('admin/recipeDelete');

const recipeEditForm = async (req, res) => {
  const idRec = req.params.id;
  const recipe = await recipeModel.getById(idRec);
  const idUserLog = req.user.id;
  const idUserRec = recipe.userId;
  const equal = idUserLog === idUserRec;

  return equal
    ? res.status(200).render('admin/recipeIdEdit', { recipe })
    : res.redirect(`/recipes/${idRec}`);
};

const recipeUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;
  const recipe = { id, name, ingredients, instructions };

  try {
    await recipeModel.updateRecipe(recipe);
  } catch (e) {
    res.status(500).send(e.message);
  }

  res.redirect('/');
};

const recipeDeleteForm = async (req, res) => {
  const recId = req.params.id;
  const recipe = await recipeModel.getById(recId);
  const idUserLog = req.user.id;
  const idUserRec = recipe.userId;
  const equal = idUserLog === idUserRec;

  return equal
    ? res.status(200).render('admin/recipeDelete', { id: recId, message: null })
    : res.redirect(`/recipes/${recId}`);
};

const recipeDel = async (req, res) => {
  const uId = req.user.id;
  const recId = req.params.id;
  const { senha } = req.body;

  try {
    await recipeModel.deleteRecipe(uId, recId, senha);
  } catch (e) {
    res.status(500).render('admin/recipeDelete', { message: e.message, id: recId });
  }

  const recipes = await recipeModel.getByUser(uId);
  res.status(200).render('home', { recipes });
};

const showUserRecipes = async (req, res) => {
  const { id } = req.user;
  const recipes = await recipeModel.getByUser(id);

  res.status(200).render('admin/userRecipes', { recipes });
};

module.exports = {
  showRecipes,
  showRecipesAdm,
  showRecipeId,
  recipeEdit,
  recipeEditForm,
  recipeUpdate,
  recipeDelete,
  recipeDeleteForm,
  recipeDel,
  recipeSearch,
  recipeForm,
  addRecipe,
  showUserRecipes,
};

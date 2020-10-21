const recipeModel = require('../models/recipeModel');

const listAllRecipes = async (req, res) => {
  const recipes = await recipeModel.findAllRecipes();
  res.render('home', { user: req.user, recipes });
};

const recipeDetail = async (req, res) => {
  const { id } = req.params;
  const recipes = await recipeModel.findRecipeById(id);
  res.render('recipeDetails', { user: req.user, recipes });
};

const searchRecipe = async (req, res) => {
  const recipes = await recipeModel.searchRecipe(req.query.q);
  res.render('searchRecipe', { user: req.user, message: 'Nenhuma receita encontrada', recipes });
};

const recipeForm = (_, res) => res.status(200).render('newRecipe', { message: null });

const newRecipe = async (req, res) => {
  const { id, firstName } = req.user;
  const { name, ingredients, instructions } = req.body;
  const recipe = { id, firstName, name, ingredients, instructions };
  const recipes = await recipeModel.findAllRecipes();

  recipeModel.newRecipe(recipe);

  return res.status(200).render('home', { user: req.user, recipes });
};

const recipeEdit = (_, res) => res.render('editRecipe');

const recipeEditForm = async (req, res) => {
  const idRec = req.params.id;
  const recipe = await recipeModel.findRecipeById(idRec);
  const idUserLog = req.user.id;
  const idUserRec = recipe.userId;
  const equal = idUserLog === idUserRec;
  return equal
    ? res.status(200).render('editRecipe', { recipe })
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

const recipeDelete = (_, res) => res.render('deleteRecipe');

const recipeDeleteForm = async (req, res) => {
  const recId = req.params.id;
  const recipe = await recipeModel.getById(recId);
  const idUserLog = req.user.id;
  const idUserRec = recipe.userId;
  const equal = idUserLog === idUserRec;

  return equal
    ? res.status(200).render('deleteRecipe', { id: recId, message: null })
    : res.redirect(`/recipes/${recId}`);
};

const recipeDel = async (req, res) => {
  const uId = req.user.id;
  const recId = req.params.id;
  const { senha } = req.body;

  try {
    await recipeModel.deleteRecipe(uId, recId, senha);
  } catch (e) {
    res.status(500).render('recipeDelete', { message: e.message, id: recId });
  }

  const recipes = await recipeModel.getByUser(uId);
  res.status(200).render('home', { recipes });
};

const showUserRecipes = async (req, res) => {
  const { id } = req.user;
  const recipes = await getByUser(id);

  res.status(200).render('userRecipes', { recipes });
};

module.exports = {
  listAllRecipes,
  recipeDetail,
  searchRecipe,
  recipeForm,
  newRecipe,
  recipeEdit,
  recipeEditForm,
  recipeUpdate,
  recipeDelete,
  recipeDeleteForm,
  recipeDel,
  showUserRecipes,
};

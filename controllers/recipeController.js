const { getAll, getById, getByName, createRecipe, updateRecipe, getByUser } = require('../models/recipeModel');

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
  const recipes = await getByName(q);

  return res.status(200).render('recipeSearch', { recipes });
};

const recipeForm = (_, res) => res.status(200).render('recipeNew', { message: null });

const addRecipe = async (req, res) => {
  const { id, firstName } = req.user;
  const { name, ingredients, instructions } = req.body;
  const recipe = { id, firstName, name, ingredients, instructions };
  const recipes = await getAll();

  createRecipe(recipe);

  // return res.status(200).render('recipeNew', { message: 'Cadastro efetuado com sucesso!' });
  return res.status(200).render('admin/home', { user: req.user, recipes });
};

// ???
const recipeEdit = (_, res) =>
  res.render('admin/recipeEdit');

const recipeDelete = (_, res) =>
  res.render('admin/recipeDelete');
// ???

const recipeEditForm = async (req, res) => {
  const idRec = req.params.id;
  const recipe = await getById(idRec);
  const idUserLog = req.user.id;
  const idUserRec = recipe.userId;
  const equal = idUserLog === idUserRec;

  return (
    equal
      ? res.status(200).render('admin/recipeIdEdit', { recipe })
      : res.redirect(`/recipes/${idRec}`)
  );
};

const recipeUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;
  const recipe = { id, name, ingredients, instructions };

  try {
    await updateRecipe(recipe);
  } catch (e) {
    res.status(500).send(e.message);
  }

  res.redirect('/');
};

const recipeDeleteForm = (_, res) => {
  res.render('admin/recipeDelete');
};

const showUserRecipes = async (req, res) => {
  const { id } = req.user;
  const recipes = await getByUser(id);

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
  recipeSearch,
  recipeForm,
  addRecipe,
  showUserRecipes,
};

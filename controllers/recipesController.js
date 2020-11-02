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

const add = async (req, res) => {
  const { name, ingredients, instructions } = req.body;

  await recipesModel.addRecipe(
    `${req.user.name} ${req.user.lastName}`,
    req.user.id,
    name,
    ingredients,
    instructions,
  );

  res.redirect('/');
};

const edit = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.getRecipeById(id);

  res.status(201).render('recipes/edit', {
    user: req.user,
    nameMessage: null,
    ingredientsMessage: null,
    instructionsMessage: null,
    successMessage: null,
    recipe,
  });
};

const update = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const { id } = req.params;
  try {
    await recipesModel.updateRecipe(id, name, ingredients, instructions);
    res.redirect('/');
  } catch (err) {
    res.send(err);
  }
};

const myRecipes = async (req, res) => {
  const recipes = await recipesModel.getAllByUserId(req.user.id);

  res.status(200).render('me/recipes', { recipes, message: null, user: req.user });
};

const deletForm = async (req, res) => {
  const { id } = req.params;
  res.status(201).render('recipes/delete', {
    user: req.user,
    message: null,
    id,
  });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const auth = await recipesModel.verifyUser(id, req.user.id, password);
  if (auth) {
    await recipesModel.deleteRecipeById(id);
    res.status(202).redirect('/');
  }
  res.status(401).render('recipes/delete', {
    user: req.user,
    id,
    message: 'Senha Incorreta.',
  });
};

module.exports = {
  index,
  show,
  search,
  newRecipe,
  add,
  edit,
  update,
  myRecipes,
  deleteRecipe,
  deletForm,
};

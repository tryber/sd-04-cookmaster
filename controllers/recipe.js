const recipeModel = require('../models/Recipe.js');

const getRecipes = async (req, res) => {
  const { user } = req;
  const recipes = await recipeModel.recipes();

  return recipes
    ? res.render('home', { user, recipes })
    : res.render('home', { message: 'No recipes found.' });
};

/**
 * Get recipe by given id.
 * @param {integer} req.param.id - Recipe id | GET Param
 */
const getRecipe = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const recipe = await recipeModel.recipe(id);

  return recipe
    ? res.render('recipe', { user, recipe })
    : res.render('home', { message: 'Recipe not found.' });
};

/**
 * Search recipe by given string.
 * @param {string} req.query.p - Search Input | GET Query
 */
const searchRecipe = async (req, res) => {
  const { q } = req.query;
  const { user } = req;

  /** Recipe search page render */
  if (!q) return res.render('search', { user, recipes: null, messages: null });

  const recipes = await recipeModel.recipes(q);

  const response = {
    user,
    recipes: recipes || null,
    messages: recipes ? null : 'Nenhuma receita encontrada.',
  };

  return res.render('search', response);
};

/** Recipe creation section */
const createRecipe = async (req, res) => {
  const recipe = req.body;
  const { user } = req;

  if (!recipe.name) return res.render('new-recipe', { user, messages: null });

  recipe.userId = user.id;
  recipe.user = `${user.firstName} ${user.lastName}`;

  const result = await recipeModel.create(recipe);

  return res.render('new-recipe', {
    user,
    messages: result ? 'Rerceita adicionada!' : 'Erro ao adiconar receita',
  });
};

/**
 * Update a recipe.
 * @param {recipe} req.body - recipe information to be updated | PUT Param
 */
const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const recipe = Object.keys(req.body).length !== 0 ? req.body : await recipeModel.recipe(id);

  if (!recipe) return res.redirect(204, '/');
  if (recipe.userID !== user.id) res.redirect(302, `/recipes/${recipe.id}`);
  if (Object.keys(req.body).length === 0) return res.render('update-recipe', { user, recipe, messages: null });

  const result = await recipeModel.update(recipe);

  return result
    ? res.redirect(200, '/')
    : res.render('update-recipe', {
      user,
      messages: 'Erro ao atualizar receita',
    });
};

module.exports = {
  getRecipes,
  getRecipe,
  searchRecipe,
  createRecipe,
  updateRecipe,
};

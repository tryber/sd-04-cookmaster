const connection = require('./connections');

const isRecipeValid = (recipe) => {
  let result = false;

  /** Check if given recipe data lenght is valid */
  result = !(Object.keys(recipe).length < 5);
  /** Check if given recipe user id is a integer */
  result = Number.isInteger(recipe.user_id);

  return result;
};

/**
 * Create a new recipe resource
 *
 * @param {object} recipe - Object containing recipe data
 */
const create = async (recipe) => {
  const { userId, user, name, instructions, ingredients } = recipe;

  const result = await connection().then((schema) =>
    schema
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'instructions', 'ingredients'])
      .values(userId, user, name, instructions, ingredients)
      .execute());

  return result || null;
};

/**
 * Get a recipe by its id
 *
 * @param {number} id - The id of the recipe
 */
const recipe = async (id) => {
  const recipeData = await connection()
    .then((schema) =>
      schema
        .getTable('recipes')
        .select(['user', 'user_id', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', id)
        .execute())
    .then((result) => result.fetchAll())
    .then((data) =>
      // eslint-disable-next-line camelcase
      data.map(([user, user_id, name, ingredients, instructions]) => ({
        id,
        user,
        userID: user_id,
        name,
        ingredients: ingredients.split(','),
        instructions,
      })));

  return recipeData[0] || null;
};

/**
 * Get all recipes
 */
const recipes = async (searchQuery) => {
  const search = searchQuery ? `name LIKE "%${searchQuery}%"` : null;

  const recipesData = await connection()
    .then((schema) =>
      schema
        .getTable('recipes')
        .select(['id', 'user', 'user_id', 'name', 'ingredients', 'instructions'])
        .where(search)
        .bind('name', search)
        .execute())
    .then((results) => results.fetchAll())
    .then((data) => data);

  return recipesData || null;
};

module.exports = {
  isRecipeValid,
  create,
  recipe,
  recipes,
};

const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((db) =>
      db.getTable('recipes').select(['id', 'user', 'name']).execute(),
    )
    .then((results) => results.fetchAll());

const getRecipeById = async (recipeId) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select([])
        .where('id = :id')
        .bind('id', recipeId)
        .execute(),
    )
    .then((result) => result.fetchOne())
    .then(([id, userId, user, title, ingredientsString, instructions]) => {
      const ingredients = ingredientsString.split(',');
      return { id, userId, user, title, ingredients, instructions };
    });

const getRecipesByUserId = async (userId) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select([])
        .where('user_id = :user_id')
        .bind('user_id', userId)
        .execute(),
    )
    .then((result) => result.fetchAll())
    .then((recipes) =>
      recipes.map(([id, userId, user, recipe, ingredients, instructions]) => ({
        id,
        userId,
        user,
        recipe,
        ingredients,
        instructions,
      })),
    );

const getRecipesByName = async (recipeName) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select([])
        .where('name = :name')
        .bind('name', recipeName)
        .execute(),
    )
    .then((result) => result.fetchAll())
    .then((recipes) =>
      recipes.map(([id, userId, user, recipe, ingredients, instructions]) => ({
        id,
        userId,
        user,
        recipe,
        ingredients,
        instructions,
      })),
    );

const insertRecipe = async (id, user, name, ingredients, instructions) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
        .values(id, user, name, ingredients, instructions)
        .execute(),
    )
    .then((result) => result.getWarningsCount());

const deleteRecipe = (recipeId) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .delete()
        .where('id = :id')
        .bind('id', recipeId)
        .execute(),
    )
    .then((result) => result.getWarningsCount());

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipesByUserId,
  getRecipesByName,
  insertRecipe,
  deleteRecipe,
};

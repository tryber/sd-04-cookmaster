const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((db) => db.getTable('recipes').select().execute())
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
        id,
        userId,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

const getRecipeById = async (recipeId) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .select()
      .where('id = :id')
      .bind('id', recipeId)
      .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, userId, user, name, ingredients, instructions]) => ({
      id,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }));

const getRecipeByQuery = async (searchInput) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .select(['id', 'user', 'name'])
      .where('name like :name')
      .bind('name', `%${searchInput}%`)
      .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    );

const registerNewRecipe = async (userId, user, name, ingredients, instructions) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, user, name, ingredients, instructions)
      .execute(),
    );

const updateRecipe = async (recipeId, name, ingredients, instructions) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .update()
      .set('name', name)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :id')
      .bind('id', recipeId)
      .execute(),
    );

const deleteRecipe = async (id) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .delete()
      .where('id = :id')
      .bind('id', id)
      .execute(),
  );

const getRecipesByUserId = async (userId) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('user_id = :user_id')
        .bind('user_id', userId)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([recipeId, user, name]) => ({
        id: recipeId,
        user,
        name,
      })),
    );

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipeByQuery,
  registerNewRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesByUserId,
};

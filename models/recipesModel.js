const connection = require('./connection');

const getAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([user, name]) => ({ user, name })));

const getAllByUserId = async (userId) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'name', 'ingredients', 'instructions'])
        .where('user_id = :user_id')
        .bind('user_id', userId)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, name, ingredients, instruction]) => ({
        id,
        name,
        ingredients,
        instruction,
      })),
    );

const getById = async (id) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((result) => result.fetchOne())
    .then(([recipeId, userId, user, name, ingredients, instructions]) => ({
      recipeId,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }));

module.exports = {
  getAll,
  getAllByUserId,
  getById,
  // isValid,
  // create,
};

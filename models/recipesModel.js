const connection = require('./connection');

const getAll = async () =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_Id', 'user', 'name', 'ingredients', 'instructions'])
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, user, name, ingredients, instructions]) => ({
        id,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

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
        .select(['id', 'user_id', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([name, ingredients, instruction]) => ({
      id,
      name,
      ingredients,
      instruction,
    }));

module.exports = {
  getAll,
  getAllByUserId,
  getById,
  // isValid,
  // create,
};

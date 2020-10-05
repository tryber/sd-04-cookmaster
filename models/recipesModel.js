const connection = require('./connection');

const findAll = async () =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, user_id, user, name, ingredients, instructions]) => ({
        id,
        user_id,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

module.exports = { findAll };

const connection = require('./connection');

const findAllRecipes = () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((results) =>
      results.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    );

const findRecipeById = (id) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((result) => result.fetchAll())
    .then((result) =>
      result.map(([id, user_id, user, name, ingredients, instructions]) => ({
        id,
        user_id,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

module.exports = {
  findAllRecipes,
  findRecipeById,
};

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

module.exports = {
  findAllRecipes,
};

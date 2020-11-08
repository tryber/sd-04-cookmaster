const connection = require('./connection');

const recipes = async () =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select()
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipesRes) => recipesRes)
    .catch((err) => err);

module.exports = recipes;

const connection = require('./connection');

const recipe = async (id) =>
connection()
.then((db) =>
  db
  .getTable('recipes')
  .select()
  .where('id = :id')
  .bind('id', id)
  .execute(),
)
.then((results) => results.fetchAll())
.then((recipeRes) => recipeRes)
.catch((err) => err);

module.exports = recipe;

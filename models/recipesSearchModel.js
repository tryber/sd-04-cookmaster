const connection = require('./connection');

const recipes = async (name) =>
connection()
.then((db) =>
  db
  .getTable('recipes')
  .select()
  .where('name like :name')
  .bind('name'.toLowerCase(), `%${name.toLowerCase()}%`)
  .execute(),
)
.then((results) => results.fetchAll())
.then((recipeRes) => recipeRes)
.catch((err) => err);

module.exports = recipes;

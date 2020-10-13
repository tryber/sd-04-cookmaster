const connection = require('./connection');

const getRecipes = async () => connection()
  .then((db) => db
    .getTable('recipes')
    .select(['user', 'name'])
    .execute())
  .then((result) => result.fetchAll())
  .then((rows) => rows.map(([user, nameRecipe]) => ({
    user,
    nameRecipe,
  })));

module.exports = {
  getRecipes,
};

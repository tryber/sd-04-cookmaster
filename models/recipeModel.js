const connection = require('./connection');

const getRecipes = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipeList) => recipeList.map(([user, name]) => ({ user, name })));

module.exports = {
  getRecipes,
};

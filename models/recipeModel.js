const conn = require('./connection');

const getAllRecipes = async () =>
  conn
    .connection()
    .then((db) => db.getTable('recipes').select(['user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([user, name]) => ({ user, name })));

module.exports = {
  getAllRecipes,
};

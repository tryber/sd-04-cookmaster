const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user_id', 'user', 'name']).execute())
    .then((results) => console.log(results.fetchAll()));

module.exports = {
  getAllRecipes,
};

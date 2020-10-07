const connection = require('./connection');

const getAllRecipes = async () => {
  return connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((data) => data.map(([id, user, name]) => ({ id, user, name })));
};

module.exports = {
  getAllRecipes,
};

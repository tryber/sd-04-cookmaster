const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((dataBase) => dataBase.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((data) =>
      data.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    );

module.exports = getAllRecipes;

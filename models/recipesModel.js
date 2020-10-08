const connection = require('./connection');

const getAllRecipes = async () => {
  return connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, user, name]) => ({
        user,
        name,
      })),
    )
    .catch((err) => console.log('ERROR=', err));
};

module.exports = { getAllRecipes };

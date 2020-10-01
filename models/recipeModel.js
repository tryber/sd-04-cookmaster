const connection = require('./connection');

const getAllRecipes = async () => {
  try {
    connection()
    .then((db) => db.getTable('recipes').select(['user', 'name']).execute())
    .then((resultSet) => resultSet.fetchAll())
    .then((recipes) => recipes.map(([user, name]) => ({ user, name })));
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getAllRecipes
};

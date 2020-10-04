const connection = require('./connection');

// implementar o método para consultar o BD
const findAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, user, name]) => ({ id, user, name })));

module.exports = {
  findAll,
};

// métodos exportados para o controller

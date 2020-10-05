const connection = require('./connection');

const findAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipe) => recipe.map(([user, name]) => ({ user, name })))
    .catch((err) => console.log('Erro findAll', err));

module.exports = {
  findAll,
};

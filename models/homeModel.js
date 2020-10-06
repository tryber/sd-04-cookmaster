const connection = require('./connection');

const acharReceitas = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((receita) => receita.map(([user, name]) => ({ user, name })));

module.exports = {
  acharReceitas,
};

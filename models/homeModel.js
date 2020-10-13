const connection = require('./connection');

const acharReceitas = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['user', 'name', 'id']).execute())
    .then((results) => results.fetchAll())
    .then((receita) => receita.map(([user, name, id]) => ({ user, name, id })));

module.exports = {
  acharReceitas,
};
